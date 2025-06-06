import { db } from './firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp, getDocs, updateDoc, Timestamp } from 'firebase/firestore';

export const saveUserData = async ({ uid, name, email }) => {
	try {
		await setDoc(doc(db, 'users', uid), {
			name,
			email,
			createdAt: new Date(),
		});
	} catch (error) {
		console.error('Error saving user data:', error);
	}
};

export const addGoals = async ({ uid, startDate, endDate, amount, description }) => {
	if (!uid) return;
	try {
		const GoalsRef = collection(doc(db, 'users', uid), 'Goals');
		await addDoc(GoalsRef, {
			startDate: Timestamp.fromDate(new Date(startDate)),
			endDate: Timestamp.fromDate(new Date(endDate)),
			amount,
			description,
			date: serverTimestamp(),
			status: 'inProgress',
		});
	} catch (error) {
		console.error('Error saving goal:', error);
	}
};

export const addSpend = async ({ uid, startDate, category, amount, description }) => {
	if (!uid) return;
	try {
		const SpendsRef = collection(doc(db, 'users', uid), 'Spends');
		await addDoc(SpendsRef, {
			startDate: Timestamp.fromDate(new Date(startDate)),
			category,
			amount,
			description,
			date: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error saving spend:', error);
	}
};

export const addJournal = async ({ uid, emotion, title, description }) => {
	if (!uid) return;
	try {
		const journalRef = collection(doc(db, 'users', uid), 'journals');
		await addDoc(journalRef, {
			emotion,
			title,
			description,
			date: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error saving journal:', error);
	}
};

export const fetchSpends = async ({ uid }) => {
	if (!uid) return;
	try {
		const SpendsRef = collection(doc(db, 'users', uid), 'Spends');
		const snapshot = await getDocs(SpendsRef);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error loading spends:', error);
	}
};

export const fetchGoal = async ({ uid }) => {
	if (!uid) return;
	try {
		const GoalRef = collection(doc(db, 'users', uid), 'Goals');
		const snapshot = await getDocs(GoalRef);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error loading goals:', error);
	}
};

export const fetchJournal = async ({ uid }) => {
	if (!uid) return;
	try {
		const JournalRef = collection(doc(db, 'users', uid), 'journals');
		const snapshot = await getDocs(JournalRef);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error loading journals:', error);
	}
};

export const updateJournal = async ({ uid, journalId, title, description }) => {
	if (!uid || !journalId) return;
	try {
		const journalDocRef = doc(db, 'users', uid, 'journals', journalId);
		await updateDoc(journalDocRef, { title, description });
	} catch (error) {
		console.error('Error updating journal:', error);
	}
};

export const getActiveGoalProgress = async ({ uid }) => {
	if (!uid) return null;
	try {
		const GoalRef = collection(doc(db, 'users', uid), 'Goals');
		const SpendRef = collection(doc(db, 'users', uid), 'Spends');

		const goalsSnapshot = await getDocs(GoalRef);
		const goals = goalsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const activeGoals = goals.filter((goal) => {
			const endDate = goal.endDate?.toDate?.() || new Date(goal.endDate);
			endDate.setHours(0, 0, 0, 0);

			return endDate >= today && goal.status === 'inProgress';
		});

		if (activeGoals.length === 0) return null;

		const activeGoal = activeGoals.sort((a, b) => b.endDate.toDate() - a.endDate.toDate())[0];

		const spendsSnapshot = await getDocs(SpendRef);
		const spends = spendsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		const filteredSpends = spends.filter((spend) => {
			let dateObj;
			if (spend.startDate?.toDate) {
				dateObj = spend.startDate.toDate();
			} else if (typeof spend.startDate === 'string' || typeof spend.startDate === 'object') {
				dateObj = new Date(spend.startDate);
			} else {
				return false;
			}
			return dateObj >= activeGoal.startDate.toDate() && dateObj <= activeGoal.endDate.toDate();
		});

		const totalSpent = filteredSpends.reduce((sum, spend) => sum + Number(spend.amount), 0);
		const totalGoal = Number(activeGoal.amount);
		const percentage = (totalSpent / totalGoal) * 100;

		return {
			spent: totalSpent,
			total: totalGoal,
			percentage,
			goalId: activeGoal.id,
			description: activeGoal.description || '',
		};
	} catch (error) {
		console.error('Error loading active goal progress:', error);
		return null;
	}
};

export const evaluateGoalsStatus = async ({ uid }) => {
	if (!uid) return;
	try {
		const GoalRef = collection(doc(db, 'users', uid), 'Goals');
		const SpendRef = collection(doc(db, 'users', uid), 'Spends');

		const [goalsSnapshot, spendsSnapshot] = await Promise.all([getDocs(GoalRef), getDocs(SpendRef)]);

		const goals = goalsSnapshot.docs.map((doc) => ({
			id: doc.id,
			ref: doc.ref,
			...doc.data(),
		}));

		const spends = spendsSnapshot.docs.map((doc) => ({ ...doc.data() }));
		const now = new Date();

		for (const goal of goals) {
			const start = goal.startDate?.toDate?.() || new Date(goal.startDate);
			const end = goal.endDate?.toDate?.() || new Date(goal.endDate);
			const amount = Number(goal.amount);

			const filteredSpends = spends.filter((spend) => {
				const spendDate = spend.startDate?.toDate?.() || new Date(spend.startDate);
				return spendDate >= start && spendDate <= end;
			});

			const totalSpent = filteredSpends.reduce((sum, spend) => sum + Number(spend.amount), 0);

			let status = goal.status || 'inProgress';

			const endOfDay = new Date(end);
			endOfDay.setHours(23, 59, 59, 999);

			if (totalSpent > amount) {
				status = 'failed';
			} else if (now > endOfDay && totalSpent <= amount) {
				status = 'completed';
			}

			if (goal.status !== status) {
				await updateDoc(goal.ref, { status });
			}
		}
	} catch (error) {
		console.error('Error evaluating goals status:', error);
	}
};

export const getCompletedGoals = async ({ uid }) => {
	if (!uid) return [];
	const allGoals = await fetchGoal({ uid });
	return allGoals.filter((goal) => goal.status === 'completed');
};

export const getFailedGoals = async ({ uid }) => {
	if (!uid) return [];
	const allGoals = await fetchGoal({ uid });
	return allGoals.filter((goal) => goal.status === 'failed');
};
