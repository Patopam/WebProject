import { Card, CardContent, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GoalStatsCard = ({ title, description, quantity, label, bgColor, iconBg }) => {
	return (
		<Card
			sx={{
				backgroundColor: bgColor,
				borderRadius: '1.5rem',
				boxShadow: 'none',
				width: '100%',
				minHeight: '12rem',
				height: 'auto',
				padding: '1.5rem',
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					padding: '0px !important',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					gap: '1rem',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
					}}
				>
					<Box
						sx={{
							backgroundColor: iconBg,
							borderRadius: '50%',
							width: '2rem',
							height: '2rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexShrink: 0,
						}}
					>
						<FavoriteBorderIcon sx={{ color: '#333', fontSize: '1.125rem' }} />
					</Box>
					<Typography
						sx={{
							fontWeight: 400,
							fontSize: '1rem',
							fontFamily: "'Manrope', sans-serif",
							lineHeight: 'normal',
							color: '#333',
						}}
					>
						{title}
					</Typography>
				</Box>

				<Typography
					sx={{
						fontSize: '1.12rem',
						fontFamily: "'Manrope', sans-serif",
						lineHeight: '1.3',
						color: '#333',
					}}
				>
					{description}
				</Typography>

				<Typography
					sx={{
						fontWeight: 600,
						fontSize: '1.4rem',
						fontFamily: "'Manrope', sans-serif",
						lineHeight: '1.2',
						color: '#000',
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
