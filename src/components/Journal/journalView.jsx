import React, { useState } from 'react';
import { Box } from '@mui/material';
import MonthFilter from '../Filters/monthFilter';
import JournalCards from '../Cards/journalCards';
import { journalData } from '../../Data/journalData';

const JournalView = () => {
	const [selectedMonth, setSelectedMonth] = useState('All');

	// Filter
	const filteredData =
		selectedMonth === 'All'
			? journalData
			: journalData
					.map((week) => ({
						...week,
						entries: week.entries.filter((entry) => entry.month === selectedMonth),
					}))
					.filter((week) => week.entries.length > 0);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			<MonthFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
			<JournalCards journalData={filteredData} />
		</Box>
	);
};

export default JournalView;
