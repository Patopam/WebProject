import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const ExactButton = styled(Button)(({ theme }) => ({
	height: '56px',
	borderRadius: '16px',
	backgroundColor: '#CBCBE7',
	color: '#000000',
	textTransform: 'none',
	paddingLeft: '16px', // Margen izquierdo constante
	paddingRight: '24px', // Margen derecho constante sin importar el texto
	boxShadow: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 8, // Espacio constante entre ícono y texto
	'&:hover': {
		backgroundColor: '#8A8AC0',
		boxShadow: 'none',
	},
	'& .MuiButton-startIcon': {
		margin: 0, // Eliminamos margen lateral del ícono
		backgroundColor: '#9C9CD2',
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fontSize: '18px',
	fontWeight: 500,
	fontFamily: "'Manrope', sans-serif",
}));

const CustomAddIcon = () => <AddIcon sx={{ fontSize: '24px', color: '#000000' }} />;

export default function AddButton({ onClick, text }) {
	return (
		<ExactButton variant='contained' startIcon={<CustomAddIcon />} onClick={onClick}>
			{text}
		</ExactButton>
	);
}
