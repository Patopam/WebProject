import React, { useState } from 'react';
import { Box } from '@mui/material';
import MonthFilter from './MonthFilter';
import JournalCards from './JournalCards';
import { journalData } from './journalData';

const JournalView = () => {
	const [selectedMonth, setSelectedMonth] = useState('All');

	// Filtrar las entradas basado en el mes seleccionado
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
