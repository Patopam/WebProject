import React, { useState } from 'react';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';
import { filterByTime } from '../../utils/utils';

const ExpenditureHistoryTable = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const timeOptions = ['Today', 'Week', 'Month'];

	const filteredData = filterByTime(data, selectedTime);

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '100%', // Cambiado de 800px a 100%
		height: '341px', // Mantenido el valor fijo original
		minHeight: '341px', // Asegura altura mínima
		padding: '3.5%', // Cambiado de 28px a 3.5% del contenedor
		borderRadius: '1.5rem', // Cambiado de 24px a 1.5rem
		backgroundColor: '#CECAE4',
		boxSizing: 'border-box',
		gap: '2.5%', // Cambiado de 20px a 2.5%
		fontFamily: "'Manrope', sans-serif",
		overflow: 'hidden',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '2%', // Cambiado de 16px a 2%
	};

	const iconContainer = {
		width: '4.6%', // Cambiado de 37px a 4.6% del contenedor
		minWidth: '30px', // Tamaño mínimo para que no se haga demasiado pequeño
		aspectRatio: '1 / 1', // Mantiene la forma circular
		borderRadius: '50%',
		backgroundColor: '#AFA8D1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontSize: 'clamp(1rem, 2vw, 1.125rem)', // Responsive entre 16px y 18px
		fontWeight: 300,
		color: '#333',
	};

	const filterBoxStyle = {
		display: 'flex',
		justifyContent: 'flex-start',
		backgroundColor: '#D1CCE4',
		borderRadius: '0.75rem', // Cambiado de 12px a 0.75rem
		padding: '1% 2%', // Cambiado de 8px 16px a porcentajes
		gap: '2.5%', // Cambiado de 20px a 2.5%
		fontWeight: 600,
		color: '#333',
		cursor: 'pointer',
	};

	const tableWrapper = {
		overflowY: 'auto',
		height: '160px', // Mantenida la altura fija original
		scrollbarWidth: 'none',
		msOverflowStyle: 'none',
	};

	const tableStyle = {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: '1.5% 3%', // Cambiado de 12px a porcentajes
		fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', // Responsive entre 12px y 14.5px
	};

	const thStyle = {
		textAlign: 'left',
		fontWeight: 600,
		color: '#333',
		padding: '0 1%', // Cambiado de 8px a 1%
	};

	const tdStyle = {
		backgroundColor: 'white',
		padding: '1.25% 1.75%', // Cambiado de 10px 14px a porcentajes
		borderRadius: '0.75rem', // Cambiado de 12px a 0.75rem
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	return (
		<div style={containerStyle}>
			{/* Header */}
			<div style={headerStyle}>
				<div style={iconContainer}>
					<AttachMoney style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#333' }} />
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
