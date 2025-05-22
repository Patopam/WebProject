import { Card, CardContent, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GoalStatsCard = ({ title, description, quantity, label, bgColor, iconBg }) => {
	return (
		<Card
			sx={{
				backgroundColor: bgColor,
				borderRadius: '1.5rem', // 24px
				boxShadow: 'none',
				width: '100%',
				minHeight: '14.875rem', // 238px
				height: 'auto',
				padding: '1.75rem', // 28px
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					padding: '0px !important',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.625rem', // 10px
						marginBottom: '1rem', // 16px
					}}
				>
					<Box
						sx={{
							backgroundColor: iconBg,
							borderRadius: '50%',
							width: '2.31rem', // 37px
							height: '2.31rem', // 37px
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexShrink: 0,
						}}
					>
						<FavoriteBorderIcon sx={{ color: '#333', fontSize: '1.25rem' }} />
					</Box>
					<Typography
						variant='h6'
						sx={{
							fontWeight: 400,
							fontSize: '1.125rem', // 18px
							fontFamily: "'Manrope', sans-serif",
							lineHeight: 'normal',
						}}
					>
						{title}
					</Typography>
				</Box>

				<Typography
					variant='body1'
					sx={{
						marginBottom: '0.5rem', // 8px
						fontSize: '1.125rem', // 18px
						fontFamily: "'Manrope', sans-serif",
						lineHeight: '1.5',
						color: '#333',
					}}
				>
					{description}
				</Typography>

				<Typography
					variant='h5'
					sx={{
						fontWeight: 'bold',
						fontSize: '1.5rem', // 24px
						fontFamily: "'Manrope', sans-serif",
						lineHeight: '1.25',
						color: '#000',
						marginTop: '0.5rem',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						gap: '0.25rem',
					}}
				>
					<span>{quantity}</span> <span>{label}</span>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default GoalStatsCard;
