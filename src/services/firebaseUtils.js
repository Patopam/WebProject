import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore/lite';

export const addUser = async ({ uidUser, name, Email }) => {
	const docRef = await addDoc(collection(db, 'usuarios'), {
		uidUser,
		name,
		Email,
	});
	console.log('Document written with ID: ', docRef.id);
};

export const addEmotion = async ({ uidUser, Emotion, Titel, Descripsion }) => {
	const docRef = await addDoc(collection(db, 'Emotion'), {
		uidUser,
		Emotion,
		Titel,
		Descripsion,
	});
	console.log('Document written with ID: ', docRef.id);
};
