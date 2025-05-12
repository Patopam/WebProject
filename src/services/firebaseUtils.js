import { db } from './firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';

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
	try {
		const docRef = await addDoc(collection(db, 'users', uid, 'journals'), {
			emotion,
			title,
			description,
			date: new Date(),
		});
		console.log('Journal guardado con ID:', docRef.id);
	} catch (error) {
		console.error('Error guardando journal:', error);
	}
};
