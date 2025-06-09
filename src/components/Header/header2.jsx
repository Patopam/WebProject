import { Box, Typography } from '@mui/material';

const Header2 = ({ title, subtitle = true }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<Typography
				component='div'
				sx={{
					alignSelf: 'stretch',
					color: 'var(--Neutral-1000, #333)',
					fontFamily: 'Manrope, sans-serif',
					fontSize: { xs: '34px', sm: '48px' },
					fontStyle: 'normal',
					fontWeight: 600,
					lineHeight: '1.2',
					wordBreak: 'break-word',
					mb: 0.3,
				}}
			>
				{title}
			</Typography>

			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					component='div'
					sx={{
						alignSelf: 'stretch',
						color: 'var(--Neutral-1000, #333)',
						fontFamily: 'Manrope, sans-serif',
						fontSize: '22.5px',
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

export default Header2;
