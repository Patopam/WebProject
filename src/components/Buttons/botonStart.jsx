import { Button, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function BotonStart({ text, Icono, onClick }) {
	const isMobile = useMediaQuery('(max-width:480px)');
	const height = isMobile ? '50px' : '63px';
	const maxWidth = isMobile ? '260px' : '100%';
	const fontSize = isMobile ? '16px' : '20px';
	const borderRadius = isMobile ? '16px' : '18px';
	const paddingX = isMobile ? '12px' : '24px';

	return (
		<StyledButton
			variant='contained'
			type='submit'
			onClick={onClick}
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
					color: '#E8E8E8',
					fontFamily: 'Manrope, sans-serif',
					fontSize,
					fontWeight: 400,
					lineHeight: 'normal',
				}}
			>
				{Icono}
				{text}
			</Typography>
		</StyledButton>
	);
}

const StyledButton = styled(Button)(() => ({
	backgroundColor: '#49499D',
	textTransform: 'none',
	boxShadow: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '8px',
	'&:hover': {
		backgroundColor: '#8A8AC0',
		boxShadow: 'none',
	},
	fontFamily: "'Manrope', sans-serif",
}));
