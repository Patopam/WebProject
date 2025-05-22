import { db } from './firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp, getDocs } from 'firebase/firestore';

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

export const addGoals = async ({ uid, startDate, endDate, price, description }) => {
	if (!uid) {
		console.error('Invalid UID when trying to save journal.');
		return;
	}

	try {
		const GoalsRef = collection(doc(db, 'users', uid), 'Goals');
		await addDoc(GoalsRef, {
			startDate,
			endDate,
			price,
			description,
			date: serverTimestamp(),
			status: 'Procces',
		});
		console.log('Goal saved successfully');
	} catch (error) {
		console.error('Error saving journal:', error);
	}
};

export const addSpend = async ({ uid, startDate, category, price, description }) => {
	if (!uid) {
		console.error('Invalid UID when trying to save journal.');
		return;
	}

	try {
		const SpendsRef = collection(doc(db, 'users', uid), 'Spends');
		await addDoc(SpendsRef, {
			startDate,
			category,
			price,
			description,
			date: serverTimestamp(),
		});
		console.log('Spend saved successfully');
	} catch (error) {
		console.error('Error saving journal:', error);
	}
};

export const addJournal = async ({ uid, emotion, title, description }) => {
	if (!uid) {
		console.error('Invalid UID when trying to save journal.');
		return;
	}

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
	if (!uid) return console.log('hola');

	try {
		const SpendsRef = collection(doc(db, 'users', uid), 'Spends');
		const snapshot = await getDocs(SpendsRef);
		const Spends = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return Spends;
	} catch (error) {
		console.error('Error loading journals:', error);
	}
};

export const fetchGoal = async ({ uid }) => {
	if (!uid) return console.log('hola');

	try {
		const GoalRef = collection(doc(db, 'users', uid), 'Goals');
		const snapshot = await getDocs(GoalRef);
		const Goal = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return Goal;
	} catch (error) {
		console.error('Error loading goals:', error);
	}
};

export const fetchJournal = async ({ uid }) => {
	if (!uid) return console.log('');

	try {
		const JournalRef = collection(doc(db, 'users', uid), 'journals');
		const snapshot = await getDocs(JournalRef);
		const Journal = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return Journal;
	} catch (error) {
		console.error('Error loading journals:', error);
	}
};
