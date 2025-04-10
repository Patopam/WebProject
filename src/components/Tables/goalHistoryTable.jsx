import React, { useState } from 'react';
import { ArrowDropDown } from '@mui/icons-material';

// Datos de ejemplo (puedes reemplazar esto con tus datos reales)
const sampleData = [
	{ date: 'Date', amount: 'Amount', category: 'Category' },
	{ date: 'Date', amount: 'Amount', category: 'Category' },
	{ date: 'Date', amount: 'Amount', category: 'Category' },
];

const GoalHistoryCard = () => {
	const [selectedTime, setSelectedTime] = useState('Today');

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
		justifyContent: 'space-between',
		backgroundColor: '#F5D889',
		borderRadius: '12px',
		padding: '12px 20px',
		marginBottom: '20px',
	};

	const filterGroup = {
		display: 'flex',
		gap: '20px',
		fontWeight: 500,
		color: '#333',
		cursor: 'pointer',
	};

	const filterItemStyle = (option) => ({
		display: 'flex',
		alignItems: 'center',
		gap: '2px',
		color: '#333',
		fontSize: '18px',
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
	};

	const tableRowStyle = {
		marginBottom: '12px',
	};

	const tableCellStyle = {
		padding: '20px',
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
				<div style={filterGroup}>
					{timeOptions.map((option) => (
						<span key={option} onClick={() => setSelectedTime(option)} style={filterItemStyle(option)}>
							{option} <ArrowDropDown />
						</span>
					))}
				</div>
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
					{sampleData.map((item, index) => (
						<tr key={index} style={tableRowStyle}>
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
