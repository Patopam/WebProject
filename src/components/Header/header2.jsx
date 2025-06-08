import { Box, Typography } from '@mui/material';

const Header2 = ({ title, subtitle = '', emoji = '', showEmoji = true }) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Typography
				component='div'
				sx={{
					alignSelf: 'stretch',
					color: 'var(--Neutral-1000, #333)',
					fontFamily: 'Manrope, sans-serif',
					fontSize: '44px',
					fontStyle: 'normal',
					fontWeight: 600,
					lineHeight: 'normal',
					mb: 0.4,
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
						fontSize: '24px',
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: 'normal',
					}}
				>
					{subtitle}
				</Typography>
				{showEmoji && (
					<span
						role='img'
						aria-label='Emoji'
						style={{
							marginLeft: '8px',
							fontSize: '30px',
						}}
					>
						{emoji}
					</span>
				)}
			</Box>
		</Box>
	);
};

export default Header2;
