import { Button } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { styled } from '@mui/material/styles';

export default function BotonStartGoogle({ onClick, text }) {
	return (
		<StyledGoogleButton
			variant='contained'
			onClick={onClick}
			startIcon={<FcGoogle />}
			sx={{
				height: {
					xs: '53px',
					sm: '60px',
					md: '62px',
				},
				width: '100%',
				maxWidth: '450px',
				borderRadius: {
					xs: '16px',
					sm: '18px',
				},
				paddingX: {
					xs: '16px',
					sm: '24px',
				},
				fontSize: {
					xs: '16px',
					sm: '18px',
					md: '19px',
				},
				fontFamily: 'Manrope, sans-serif',
				color: '#1F1F1F',
				fontWeight: 400,
				textTransform: 'none',
			}}
		>
			{text}
		</StyledGoogleButton>
	);
}
const StyledGoogleButton = styled(Button)(() => ({
	backgroundColor: '#D2D2D2',
	textTransform: 'none',
	boxShadow: 'none',
	minWidth: 'auto',
	width: '100%',
	whiteSpace: 'nowrap',

	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '8px',

	overflow: 'hidden',
	textOverflow: 'ellipsis',

	'&:hover': {
		backgroundColor: '#A4A4A4',
		boxShadow: 'none',
	},

	'& .MuiButton-startIcon': {
		margin: 0,
		width: '22px',
		height: '22px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	fontFamily: "'Manrope', sans-serif",
}));
