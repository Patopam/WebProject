import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function getEmotionSpendingStats(uid) {
	if (!uid) return { emotion: 'none', percentage: 0 };
	const journalSnap = await getDocs(collection(doc(db, 'users', uid), 'journals'));
	const spendsSnap = await getDocs(collection(doc(db, 'users', uid), 'Spends'));

	const journalsByDate = {};
	journalSnap.docs.forEach((doc) => {
		const data = doc.data();
		const dateStr = data.date.toDate().toDateString();
		journalsByDate[dateStr] = data.emotion;
	});

	// Add expenses according to the emotion found that day
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

	// Calculate emotion with more expense
	const sorted = Object.entries(emotionSpendMap).sort((a, b) => b[1] - a[1]);
	const [topEmotion, topAmount] = sorted[0] || ['none', 0];
	const percentage = total > 0 ? Math.round((topAmount / total) * 100) : 0;

	return { emotion: topEmotion, percentage };
}
