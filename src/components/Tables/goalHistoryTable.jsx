import React, { useState } from 'react';
import { filterByTime } from '../../utils';
import { ArrowDropDown } from '@mui/icons-material';

// Datos de ejemplo por periodo (puedes reemplazar esto con tus datos reales)
const sampleData = {
	Today: [
		{ date: 'Date', amount: 'Amount', category: 'Category' },
		{ date: 'Date', amount: 'Amount', category: 'Category' },
		{ date: 'Date', amount: 'Amount', category: 'Category' },
	],
	Week: [
		{ date: 'Date', amount: 'Amount', category: 'Category' },
		{ date: 'Date', amount: 'Amount', category: 'Category' },
		{ date: 'Date', amount: 'Amount', category: 'Category' },
	],
	Month: [
		{ date: 'Date', amount: 'Amount', category: 'Category' },
		{ date: 'Date', amount: 'Amount', category: 'Category' },
		{ date: 'Date', amount: 'Amount', category: 'Category' },
	],
};

const GoalHistoryCard = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');

	// Usa la función filterByTime si se proporciona data, o usa los datos de ejemplo
	const displayData = data ? filterByTime(data, selectedTime) : sampleData[selectedTime];

	const timeOptions = ['Today', 'Week', 'Month'];

	const containerStyle = {
		width: '800px',
		borderRadius: '16px',
		backgroundColor: '#FCE2A9',
		padding: '20px',
		fontFamily: "'Manrope', sans-serif",
		boxSizing: 'border-box',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		marginBottom: '20px',
	};

	const iconContainer = {
		width: '48px',
		height: '48px',
		borderRadius: '50%',
		backgroundColor: '#FACD69',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#000',
		fontSize: '24px',
		fontWeight: 'bold',
	};

	const titleStyle = {
		fontSize: '24px',
		fontWeight: 500,
		color: '#333',
	};

	const filterBoxStyle = {
		display: 'flex',
		backgroundColor: '#F5D889',
		borderRadius: '12px',
		padding: '12px 20px',
		marginBottom: '20px',
	};

	const filterItemStyle = (option) => ({
		display: 'flex',
		alignItems: 'center',
		gap: '2px',
		color: '#333',
		fontSize: '18px',
		cursor: 'pointer',
		flex: 1,
		justifyContent: 'center',
		fontWeight: selectedTime === option ? 600 : 400,
	});

	const tableStyle = {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: '0 12px',
	};

	const tableHeaderStyle = {
		textAlign: 'left',
		padding: '0 20px',
		color: '#333',
		fontWeight: 600,
		fontSize: '18px',
		width: '33.33%', // Distribuir equitativamente las columnas
	};

	const tableCellStyle = {
		padding: '12px 20px',
		fontSize: '18px',
		color: '#333',
	};

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={iconContainer}>$</div>
				<div style={titleStyle}>Goal history</div>
			</div>

			<div style={filterBoxStyle}>
				{timeOptions.map((option) => (
					<div key={option} onClick={() => setSelectedTime(option)} style={filterItemStyle(option)}>
						{option} <ArrowDropDown />
					</div>
				))}
			</div>

			<table style={tableStyle}>
				<thead>
					<tr>
						<th style={tableHeaderStyle}>Date</th>
						<th style={tableHeaderStyle}>Amount</th>
						<th style={tableHeaderStyle}>Category</th>
					</tr>
				</thead>
				<tbody>
					{displayData.map((item, index) => (
						<tr key={index}>
							<td style={tableCellStyle}>{item.date}</td>
							<td style={tableCellStyle}>{item.amount}</td>
							<td style={tableCellStyle}>{item.category}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GoalHistoryCard;
