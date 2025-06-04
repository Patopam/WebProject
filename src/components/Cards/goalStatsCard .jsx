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
				minHeight: '14.875rem',
				height: 'auto',
				padding: '1.75rem',
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
						gap: '0.625rem',
						marginBottom: '1rem',
					}}
				>
					<Box
						sx={{
							backgroundColor: iconBg,
							borderRadius: '50%',
							width: '2.31rem',
							height: '2.31rem',
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
							fontSize: '1.125rem',
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
						marginBottom: '0.5rem',
						fontSize: '1.125rem',
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
						fontSize: '1.5rem',
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
