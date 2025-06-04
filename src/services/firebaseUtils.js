import { db } from './firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp, getDocs, updateDoc } from 'firebase/firestore';

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
	if (!uid) {
		console.error('Invalid UID when trying to save goal.');
		return;
	}
	try {
		const GoalsRef = collection(doc(db, 'users', uid), 'Goals');
		await addDoc(GoalsRef, {
			startDate,
			endDate,
			amount,
			description,
			date: serverTimestamp(),
			status: 'Procces',
		});
	} catch (error) {
		console.error('Error saving goal:', error);
	}
};

export const addSpend = async ({ uid, startDate, category, amount, description }) => {
	if (!uid) {
		console.error('Invalid UID when trying to save spend.');
		return;
	}
	try {
		const SpendsRef = collection(doc(db, 'users', uid), 'Spends');
		await addDoc(SpendsRef, {
			startDate,
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
		console.error('Error loading journals:', error);
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

export const updateJournal = async ({ uid, journalId, title, description }) => {
	if (!uid || !journalId) {
		console.error('Invalid UID or Journal ID when updating.');
		return;
	}

	try {
		const journalDocRef = doc(db, 'users', uid, 'journals', journalId);
		await updateDoc(journalDocRef, {
			title,
			description,
		});
	} catch (error) {
		console.error('Error updating journal:', error);
	}
};
