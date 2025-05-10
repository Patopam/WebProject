import React from 'react';
import { Box } from '@mui/material';

const MonthFilter = ({ selectedMonth, setSelectedMonth }) => {
	const months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Agu', 'Jul', 'Sep', 'Oct', 'Nov', 'Dic'];

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '8px',
			}}
		>
			{months.map((month) => (
				<Box
					key={month}
					component='button'
					onClick={() => setSelectedMonth(month)}
					sx={{
						display: 'flex',
						width: '5rem', // 80px
						height: '2.813rem', // 45px
						padding: '6px 24px',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '24px',
						borderRadius: '999px',
						background: selectedMonth === month ? '#4B4990' : '#5F5DA6',
						color: '#fff',
						border: 'none',
						cursor: 'pointer',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '14px',
						fontWeight: 500,
						'&:hover': {
							background: '#4B4990',
						},
					}}
				>
					{month}
				</Box>
			))}
		</Box>
	);
};

export default MonthFilter;
