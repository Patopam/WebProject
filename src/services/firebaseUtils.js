import { db } from './firebase';
import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const saveUserData = async ({ uid, name, email }) => {
	try {
		await setDoc(doc(db, 'users', uid), {
			name,
			email,
			createdAt: new Date(),
		});
		console.log('Datos del usuario guardados correctamente en users/{uid}');
	} catch (error) {
		console.error('Error al guardar los datos del usuario:', error);
	}
};

export const addJournal = async ({ uid, emotion, title, description }) => {
	if (!uid) {
		console.error('UID inválido al intentar guardar journal.');
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
		console.log('Journal guardado correctamente');
	} catch (error) {
		console.error('Error guardando journal:', error);
	}
};
