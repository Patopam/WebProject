import React from 'react';
import { AttachMoney } from '@mui/icons-material';

const ExpensesDay = () => {
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '100%', // Cambiado de 660px a 100%
		height: '361px', // Mantenido el valor fijo original
		minHeight: '341px', // Asegura altura mínima
		padding: '4.2%', // Cambiado de 28px a 4.2% del contenedor
		borderRadius: '1.5rem', // Cambiado de 24px a 1.5rem
		backgroundColor: '#CECAE4',
		boxSizing: 'border-box',
		gap: '8.8%', // Cambiado de 30px a 8.8% (30px es aproximadamente 8.8% de 341px)
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
		gap: '16px', // Vuelvo al gap original fijo
		maxWidth: 'calc(100% - 20px)', // Dar un poco de margen para evitar desbordamiento
	};

	const iconContainerStyle = {
		width: '37px', // Mantengo el tamaño original fijo
		height: '37px', // Mantengo el tamaño original fijo
		borderRadius: '50%',
		backgroundColor: '#AFA8D1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const headerTitleStyle = {
		fontSize: '18px', // Tamaño fijo para mantener consistencia
		fontWeight: 300,
		color: '#333',
		whiteSpace: 'nowrap', // Asegura que el título está en una sola línea
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	const allViewStyle = {
		fontSize: 'clamp(0.875rem, 1.8vw, 1rem)', // Responsive entre 14px y 16px
		color: '#333',
		fontWeight: 400,
	};

	const tableStyle = {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: '1.8% 3.5%', // Cambiado de 12px a porcentajes
		fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', // Responsive entre 12px y 14.5px
	};

	const thStyle = {
		textAlign: 'left',
		fontWeight: 600,
		color: '#333',
		padding: '0 1.2%', // Cambiado de 8px a 1.2%
	};

	const tdStyle = {
		backgroundColor: 'white',
		padding: '1.5% 2.1%', // Cambiado de 10px 14px a porcentajes
		borderRadius: '0.75rem', // Cambiado de 12px a 0.75rem
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
						<AttachMoney style={{ fontSize: '24px', color: '#333' }} />
					</div>
					<div style={headerTitleStyle}>Expenses of the day</div>
				</div>
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
