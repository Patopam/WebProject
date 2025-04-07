import React from 'react';
import { AttachMoney } from '@mui/icons-material';

const ExpensesDay = ({ dashboard = false }) => {
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: dashboard ? '100%' : '544px',
		height: dashboard ? 'auto' : '341px',
		padding: dashboard ? '20px' : '28px',
		borderRadius: '24px',
		backgroundColor: '#CECAE4',
		boxSizing: 'border-box',
		gap: dashboard ? '20px' : '30px',
		fontFamily: "'Manrope', sans-serif",
		overflow: 'hidden',
	};

	const headerStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	};

	const headerLeftStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
	};

	const iconContainerStyle = {
		width: '37px',
		height: '37px',
		borderRadius: '50%',
		backgroundColor: '#AFA8D1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const headerTitleStyle = {
		fontSize: '18px',
		fontWeight: 300,
		color: '#333',
	};

	const allViewStyle = {
		fontSize: '16px',
		color: '#333',
		fontWeight: 400,
	};

	const tableStyle = {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: dashboard ? '8px 8px' : '12px 12px',
		fontSize: dashboard ? '13.5px' : '14.5px',
	};

	const thStyle = {
		textAlign: 'left',
		fontWeight: 600,
		color: '#333',
		padding: '0 8px',
	};

	const tdStyle = {
		backgroundColor: 'white',
		padding: dashboard ? '8px 12px' : '10px 14px',
		borderRadius: '12px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	const data = [
		{ spend: 'Coffee', price: '$2.000', category: 'Food' },
		{ spend: 'Cinema', price: '$30.000', category: 'Experien...' },
		{ spend: 'Burger', price: '$12.000', category: 'Food' },
		{ spend: 'Subway', price: '$8.500', category: 'Transport' },
	];

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={headerLeftStyle}>
					<div style={iconContainerStyle}>
						<AttachMoney style={{ color: '#333' }} />
					</div>

					<span style={headerTitleStyle}>Expenses of the day</span>
				</div>

				<span style={allViewStyle}>All view</span>
			</div>

			<table style={tableStyle}>
				<thead>
					<tr>
						<th style={thStyle}>Spend</th>
						<th style={thStyle}>Price</th>
						<th style={thStyle}>Category</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td style={tdStyle}>{item.spend}</td>
							<td style={tdStyle}>{item.price}</td>
							<td style={tdStyle}>{item.category}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ExpensesDay;

// Uso:
// <ExpensesDay /> // Normal
// <ExpensesDay dashboard={true} /> // Versión para dashboard
