import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const StyleBotton = styled(Button)(() => ({
	height: '56px',
	borderRadius: '16px',
	backgroundColor: '#49499D',
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

	fontSize: '18px',
	fontWeight: 500,
	fontFamily: "'Manrope', sans-serif",
}));

export default function BotonStart({ onClick, text, Icono }) {
	return (
		<StyleBotton variant='contained' onClick={onClick}>
			<Typography
				sx={{
					color: 'var(--Neutral-1000, #333)',
					fontFamily: 'Manrope, sans-serif',
					fontSize: '20px',
					fontStyle: 'normal',
					fontWeight: 400,
					lineHeight: 'normal',
				}}
			>
				{Icono}
				{text}
			</Typography>
		</StyleBotton>
	);
}
