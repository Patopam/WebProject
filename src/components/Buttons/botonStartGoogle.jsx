import { Button, Typography } from '@mui/material';
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
				maxWidth: '100%',
				borderRadius: {
					xs: '16px',
					sm: '18px',
				},
				paddingLeft: {
					xs: '12px',
					sm: '24px',
				},
				paddingRight: {
					xs: '12px',
					sm: '24px',
				},
			}}
		>
			<Typography
				sx={{
					color: '#1F1F1F',
					fontFamily: 'Manrope, sans-serif',
					fontSize: {
						xs: '16px',
						sm: '18px',
						md: '19px',
					},
					fontWeight: 400,
					lineHeight: 'normal',
				}}
			>
				{text}
			</Typography>
		</StyledGoogleButton>
	);
}

const StyledGoogleButton = styled(Button)(() => ({
	backgroundColor: '#D2D2D2',
	textTransform: 'none',
	boxShadow: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '8px',
	'&:hover': {
		backgroundColor: '#A4A4A4',
		boxShadow: 'none',
	},
	'& .MuiButton-startIcon': {
		margin: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#000000',
	},
	fontFamily: "'Manrope', sans-serif",
}));
