import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function BotonStart({ text, Icono, onClick }) {
	return (
		<StyleBotton variant='contained' type='summit' onClick={onClick}>
			<Typography
				sx={{
					color: '#E8E8E8',
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
