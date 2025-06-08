import { Box, Typography } from '@mui/material';

const Header = ({ Nombre, subtitle = true }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography
				component='div'
				sx={{
					alignSelf: 'stretch',
					color: 'var(--Neutral-1000, #333)',
					fontFamily: 'Manrope, sans-serif',
					fontSize: '46px',
					fontStyle: 'normal',
					fontWeight: 600,
					lineHeight: 'normal',
					mb: 0.3,
				}}
			>
				Welcome {Nombre}!
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					component='div'
					sx={{
						alignSelf: 'stretch',
						color: 'var(--Neutral-1000, #333)',
						fontFamily: 'Manrope, sans-serif',
						fontSize: '24px',
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: '1.4',
					}}
				>
					{subtitle}
				</Typography>
			</Box>
		</Box>
	);
};

export default Header;
