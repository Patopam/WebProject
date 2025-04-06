import * as React from 'react';
import IconButton from '@mui/material/IconButton';

// Este componente recibe un icono como prop
export default function CustomIconButton({ icon, onClick, ariaLabel = 'button' }) {
	return (
		<IconButton
			aria-label={ariaLabel}
			onClick={onClick}
			sx={{
				alignItems: 'center',
				backgroundColor: '#33336F', // Fondo morado oscuro
				color: '#ffffff', // Icono blanco
				width: '55px',
				height: '55px',
				'&:hover': {
					backgroundColor: '#CBCBE7', // Morado más claro al hacer hover
				},
			}}
		>
			{icon}
		</IconButton>
	);
}
