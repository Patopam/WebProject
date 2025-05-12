import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import MonthFilter from '../Filters/monthFilter';
import JournalCards from '../Cards/journalCards';

const JournalView = () => {
	const uid = useSelector((state) => state.userId.id);
	const [journals, setJournals] = useState([]);
	const [selectedMonth, setSelectedMonth] = useState('All');

	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dic'];

	useEffect(() => {
		const fetchJournals = async () => {
			if (!uid) return;

			try {
				const journalRef = collection(db, 'users', uid, 'journals');
				const snapshot = await getDocs(journalRef);

				const data = snapshot.docs.map((doc) => {
					const entry = doc.data();
					const date = entry.date?.toDate ? entry.date.toDate() : new Date();
					return {
						...entry,
						month: monthNames[date.getMonth()],
						day: date.toLocaleDateString('en-US', { weekday: 'long' }),
					};
				});

				setJournals(data);
			} catch (error) {
				console.error('Error cargando journals:', error);
			}
		};

		fetchJournals();
	}, [uid]);

	const groupedByWeek = journals.reduce((acc, entry, index) => {
		const week = Math.floor(index / 7) + 1;
		if (!acc[week]) acc[week] = [];
		acc[week].push(entry);
		return acc;
	}, {});

	const filteredData = Object.entries(groupedByWeek)
		.map(([week, entries]) => ({
			week,
			entries: selectedMonth === 'All' ? entries : entries.filter((e) => e.month === selectedMonth),
		}))
		.filter((group) => group.entries.length > 0);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<MonthFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
			<JournalCards journalData={filteredData} />
		</Box>
	);
};

export default JournalView;
