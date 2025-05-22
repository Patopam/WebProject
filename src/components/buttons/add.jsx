import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

export default function AddButton({ onClick, text }) {
	return (
		<ExactButton variant='contained' startIcon={<CustomAddIcon />} onClick={onClick}>
			{text}
		</ExactButton>
	);
}
const CustomAddIcon = () => <AddIcon sx={{ fontSize: '24px', color: '#000000' }} />;
const ExactButton = styled(Button)(() => ({
	height: '56px',
	borderRadius: '16px',
	backgroundColor: '#CBCBE7',
	color: '#000000',
	textTransform: 'none',
	paddingLeft: '16px',
	paddingRight: '24px',
	boxShadow: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 8,
	'&:hover': {
		backgroundColor: '#8A8AC0',
		boxShadow: 'none',
	},
	'& .MuiButton-startIcon': {
		margin: 0,
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
