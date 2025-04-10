import React, { useState } from 'react';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';
import { filterByTime } from '../../utils';

const ExpenditureHistoryTable = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const timeOptions = ['Today', 'Week', 'Month'];

	const filteredData = filterByTime(data, selectedTime);

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '800px',
		height: '341px',
		padding: '28px',
		borderRadius: '24px',
		backgroundColor: '#CECAE4',
		boxSizing: 'border-box',
		gap: '20px',
		fontFamily: "'Manrope', sans-serif",
		overflow: 'hidden',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
	};

	const iconContainer = {
		width: '37px',
		height: '37px',
		borderRadius: '50%',
		backgroundColor: '#AFA8D1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontSize: '18px',
		fontWeight: 300,
		color: '#333',
	};

	const filterBoxStyle = {
		display: 'flex',
		justifyContent: 'flex-start',
		backgroundColor: '#D1CCE4',
		borderRadius: '12px',
		padding: '8px 16px',
		gap: '20px',
		fontWeight: 600,
		color: '#333',
		cursor: 'pointer',
	};

	const tableWrapper = {
		overflowY: 'auto',
		height: '160px',
		scrollbarWidth: 'none',
		msOverflowStyle: 'none',
	};

	const tableStyle = {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: '12px 12px',
		fontSize: '14.5px',
	};

	const thStyle = {
		textAlign: 'left',
		fontWeight: 600,
		color: '#333',
		padding: '0 8px',
	};

	const tdStyle = {
		backgroundColor: 'white',
		padding: '10px 14px',
		borderRadius: '12px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	return (
		<div style={containerStyle}>
			{/* Header */}
			<div style={headerStyle}>
				<div style={iconContainer}>
					<AttachMoney style={{ fontSize: '24px', color: '#333' }} />
				</div>
				<div style={titleStyle}>Expenditure History</div>
			</div>

			{/* Filtros */}
			<div style={filterBoxStyle}>
				{timeOptions.map((option) => (
					<span
						key={option}
						onClick={() => setSelectedTime(option)}
						style={{
							textDecoration: selectedTime === option ? 'underline' : 'none',
							display: 'flex',
							alignItems: 'center',
							gap: '2px',
						}}
					>
						{option} <ArrowDropDown fontSize='small' />
					</span>
				))}
			</div>

			<div style={tableWrapper}>
				<table style={tableStyle}>
					<thead>
						<tr>
							<th style={thStyle}>Date</th>
							<th style={thStyle}>Amount</th>
							<th style={thStyle}>Category</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item, index) => (
							<tr key={index}>
								<td style={tdStyle}>{item.date}</td>
								<td style={tdStyle}>{item.amount}</td>
								<td style={tdStyle}>{item.category}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ExpenditureHistoryTable;
