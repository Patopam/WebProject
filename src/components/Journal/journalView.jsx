import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import MonthFilter from '../Filters/monthFilter';
import JournalCards from '../Cards/journalCards';

const JournalView = () => {
	const uid = useSelector((state) => state.userId.id);
	const [journals, setJournals] = useState([]);
	const [selectedMonth, setSelectedMonth] = useState('All');
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [availableYears, setAvailableYears] = useState([]);

	useEffect(() => {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dic'];

		const fetchJournals = async () => {
			if (!uid) return;
			try {
				const journalRef = collection(doc(db, 'users', uid), 'journals');
				const snapshot = await getDocs(journalRef);
				const data = snapshot.docs.map((doc) => {
					const entry = doc.data();
					const date = entry.date?.toDate ? entry.date.toDate() : new Date();
					return {
						id: doc.id,
						...entry,
						date: date,
						month: monthNames[date.getMonth()],
						year: date.getFullYear(),
					};
				});

				const sortedData = data.sort((a, b) => b.date - a.date);
				const years = [...new Set(sortedData.map((j) => j.year))];

				setJournals(sortedData);
				setAvailableYears(years);
			} catch (error) {
				console.error('Error loading journals:', error);
			}
		};

		fetchJournals();
	}, [uid]);

	const filteredJournals = journals.filter((entry) => {
		const matchesMonth = selectedMonth === 'All' || entry.month === selectedMonth;
		const matchesYear = entry.year === selectedYear;
		return matchesMonth && matchesYear;
	});

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<MonthFilter
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
				selectedYear={selectedYear}
				setSelectedYear={setSelectedYear}
				availableYears={availableYears}
			/>
			<JournalCards journalData={filteredJournals} />
		</Box>
	);
};

export default JournalView;
