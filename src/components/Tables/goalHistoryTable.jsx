import React, { useState } from 'react';
import { filterByTime } from '../../utils/utils';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';

const GoalHistoryCard = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const [selectedStatus, setSelectedStatus] = useState('All');

	const filteredByTime = filterByTime(data, selectedTime);
	const filteredData = filteredByTime.filter((item) =>
		selectedStatus === 'All' ? true : item.status.toLowerCase() === selectedStatus.toLowerCase()
	);

	const timeOptions = ['Today', 'Week', 'Month'];
	const statusOptions = ['All', 'Completed', 'Failed'];

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '100%', // Cambiado de 800px a 100%
		height: '23rem', // Mantenido el valor fijo original
		minHeight: '23rem', // Asegura altura mínima
		padding: '3.5%', // Cambiado de 28px a 3.5% del contenedor
		borderRadius: '1.5rem', // Cambiado de 24px a 1.5rem
		backgroundColor: '#FCE2A9',
		boxSizing: 'border-box',
		fontFamily: "'Manrope', sans-serif",
		gap: '2.5%', // Cambiado de 20px a 2.5%
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
		backgroundColor: '#FACD69',
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
		justifyContent: 'space-between',
		backgroundColor: '#F5D889',
		borderRadius: '0.75rem', // Cambiado de 12px a 0.75rem
		padding: '1% 2%', // Cambiado de 8px 16px a porcentajes
	};

	const filterGroup = {
		display: 'flex',
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
			<div style={headerStyle}>
				<div style={iconContainer}>
					<AttachMoney style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#333' }} />
				</div>
				<div style={titleStyle}>Goal History</div>
			</div>

			<div style={filterBoxStyle}>
				<div style={filterGroup}>
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

				<div style={filterGroup}>
					{statusOptions.map((option) => (
						<span
							key={option}
							onClick={() => setSelectedStatus(option)}
							style={{
								textDecoration: selectedStatus === option ? 'underline' : 'none',
							}}
						>
							{option}
						</span>
					))}
				</div>
			</div>

			<div style={tableWrapper}>
				<table style={tableStyle}>
					<thead>
						<tr>
							<th style={thStyle}>Date</th>
							<th style={thStyle}>Goal</th>
							<th style={thStyle}>Amount</th>
							<th style={thStyle}>Status</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((goal, index) => (
							<tr key={index}>
								<td style={tdStyle}>{goal.date}</td>
								<td style={tdStyle}>{goal.title}</td>
								<td style={tdStyle}>{goal.amount}</td>
								<td style={tdStyle}>{goal.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default GoalHistoryCard;
