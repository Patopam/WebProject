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

// Ícono más pequeño
const CustomAddIcon = () => <AddIcon sx={{ fontSize: '20px', color: '#000000' }} />;

const ExactButton = styled(Button)(() => ({
	height: '46px', // 🔽 antes 56px
	borderRadius: '12px', // 🔽 antes 16px
	backgroundColor: '#CBCBE7',
	color: '#000000',
	textTransform: 'none',
	paddingLeft: '12px', // 🔽 antes 16px
	paddingRight: '18px', // 🔽 antes 24px
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
		width: '30px', // 🔽 antes 40px
		height: '30px',
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	fontSize: '16px', // 🔽 antes 18px
	fontWeight: 500,
	fontFamily: "'Manrope', sans-serif",
}));
