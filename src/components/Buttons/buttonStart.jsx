import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function BotonStart({ text, Icono, onClick }) {
	const isLargeMobile = useMediaQuery('(min-width:430px)');

	const height = isLargeMobile
		? '63px'
		: {
				xs: '56px',
				sm: '58px',
				md: '60px',
		  };

	const fontSize = {
		xs: '17px',
		sm: '18px',
		md: '19px',
	};

	return (
		<StyledButton
			variant='contained'
			type='submit'
			onClick={onClick}
			sx={{
				height,
				maxWidth: '100%',
				borderRadius: { xs: '16px', sm: '18px' },
				paddingX: { xs: '12px', sm: '24px' },
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
