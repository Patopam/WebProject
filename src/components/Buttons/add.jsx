import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

export default function AddButton({ onClick, text }) {
	return (
		<ExactButton variant='contained' startIcon={<CustomAddIcon />} onClick={onClick} aria-label='add-button'>
			{text}
		</ExactButton>
	);
}

const CustomAddIcon = () => <AddIcon sx={{ fontSize: '20px', color: '#000000' }} />;

const ExactButton = styled(Button)(() => ({
	height: '46px',
	borderRadius: '12px',
	backgroundColor: '#CBCBE7',
	color: '#000000',
	textTransform: 'none',
	paddingLeft: '12px',
	paddingRight: '18px',
	boxShadow: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 8,
	fontSize: '16px',
	fontWeight: 500,
	fontFamily: "'Manrope', sans-serif",
	transition: 'none',

	touchAction: 'manipulation',
	WebkitTapHighlightColor: 'transparent',
	width: 'auto',

	'@media (max-width: 768px)': {
		width: '100%',
		minWidth: 0,
	},

	'&:hover': {
		backgroundColor: '#8A8AC0',
		boxShadow: 'none',
	},

	'&:active': {
		transform: 'none',
		boxShadow: 'none',
		backgroundColor: '#CBCBE7',
	},

	'& .MuiButton-startIcon': {
		margin: 0,
		backgroundColor: '#9C9CD2',
		width: '30px',
		height: '30px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	'@media (hover: hover)': {
		'&:hover': {
			backgroundColor: '#8A8AC0',
		},
	},
}));
