import { Button, Typography, useMediaQuery } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { styled } from '@mui/material/styles';

export default function BotonStartGoogle({ onClick, text }) {
	const isMobile = useMediaQuery('(max-width:480px)');
	const height = isMobile ? '50px' : '63px';
	const maxWidth = isMobile ? '260px' : '100%';
	const fontSize = isMobile ? '16px' : '20px';
	const borderRadius = isMobile ? '16px' : '16px';
	const paddingX = isMobile ? '12px' : '24px';

	return (
		<StyledGoogleButton
			variant='contained'
			onClick={onClick}
			startIcon={<FcGoogle />}
			sx={{
				height,
				maxWidth,
				borderRadius,
				paddingLeft: paddingX,
				paddingRight: paddingX,
			}}
		>
			<Typography
				sx={{
					color: '#1F1F1F',
					fontFamily: 'Manrope, sans-serif',
					fontSize,
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
