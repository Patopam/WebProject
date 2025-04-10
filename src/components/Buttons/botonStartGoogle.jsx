import { Button, Typography } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { styled } from '@mui/material/styles';
const StyleBotton = styled(Button)(() => ({
	height: '56px',
	borderRadius: '16px',
	backgroundColor: '#E8E8E8',
	textTransform: 'none',
	paddingLeft: '16px',
	paddingRight: '24px',
	boxShadow: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 8,
	'&:hover': {
		backgroundColor: '#A4A4A4',
		boxShadow: 'none',
	},
	'& .MuiButton-startIcon': {
		margin: 0,
		color: '#000000',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

export default function BotonStartGoogle({ onClick, text }) {
	return (
		<StyleBotton variant='contained' onClick={onClick} startIcon={<FcGoogle />}>
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
				{text}
			</Typography>
		</StyleBotton>
	);
}
