import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';

// Esta función analiza la relación entre emociones y gastos
export async function getEmotionSpendingStats(uid) {
	if (!uid) return { emotion: 'none', percentage: 0 };

	// Obtener journals y gastos del usuario
	const journalSnap = await getDocs(collection(doc(db, 'users', uid), 'journals'));
	const spendsSnap = await getDocs(collection(doc(db, 'users', uid), 'Spends'));

	// Mapear journals con fecha como string (clave para cruzar con gastos)
	const journalsByDate = {};
	journalSnap.docs.forEach((doc) => {
		const data = doc.data();
		const dateStr = data.date.toDate().toDateString();
		journalsByDate[dateStr] = data.emotion;
	});

	// Sumar gastos según emoción encontrada ese día
	const emotionSpendMap = {};
	let total = 0;

	spendsSnap.docs.forEach((doc) => {
		const data = doc.data();
		const dateStr = data.date.toDate().toDateString();
		const emotion = journalsByDate[dateStr];

		if (emotion) {
			if (!emotionSpendMap[emotion]) emotionSpendMap[emotion] = 0;
			emotionSpendMap[emotion] += Number(data.amount);
			total += Number(data.amount);
		}
	});

	// Calcular emoción con más gasto
	const sorted = Object.entries(emotionSpendMap).sort((a, b) => b[1] - a[1]);
	const [topEmotion, topAmount] = sorted[0] || ['none', 0];
	const percentage = total > 0 ? Math.round((topAmount / total) * 100) : 0;

	return { emotion: topEmotion, percentage };
}
