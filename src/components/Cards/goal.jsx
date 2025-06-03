import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const GoalProgressCard = ({ spent = 150000, total = 200000 }) => {
	const progressPercentage = (spent / total) * 100;

	const formattedSpent = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(spent);

	const formattedTotal = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(total);

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flex: '1 1 20rem',
				width: '100%',
				minHeight: '13rem',
				height: '100%',
				borderRadius: '1.5rem',
				background: '#FCE2A9',
				boxShadow: 'none',
				padding: '1.5rem',
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					justifyContent: 'space-between',
					padding: '0px !important',
					gap: '1.3rem',
				}}
			>
				{/* Header con ícono y texto */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box
							sx={{
								backgroundColor: '#FACD69',
								borderRadius: '50%',
								width: '2rem',
								height: '2rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.5rem',
							}}
						>
							<TrendingUpIcon sx={{ color: '#333', fontSize: '1.125rem' }} />
						</Box>

						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1rem',
								fontWeight: 400,
								color: '#333',
							}}
						>
							Goal progress
						</Typography>
					</Box>
				</Box>

				{/* Contenido del progreso */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.5rem',
						width: '100%',
					}}
				>
					<Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontWeight: 600,
								fontSize: '1.125rem',
								color: '#000',
								lineHeight: '120%',
							}}
						>
							You have spent {formattedSpent}
						</Typography>
						<Typography
							sx={{
								fontSize: '1rem',
								color: '#555',
								fontFamily: "'Manrope', sans-serif",
							}}
						>
							of {formattedTotal}
						</Typography>
					</Box>

					<LinearProgress
						variant='determinate'
						value={progressPercentage}
						sx={{
							height: '0.5rem',
							borderRadius: '0.25rem',
							backgroundColor: '#C8D39F',
							'& .MuiLinearProgress-bar': {
								backgroundColor: '#8C9F49',
								borderRadius: '0.25rem',
							},
							margin: '0.4rem 0',
						}}
					/>

					<Typography
						sx={{
							fontSize: '0.875rem',
							color: '#666',
							fontFamily: "'Manrope', sans-serif",
						}}
					>
						You are approaching the limit
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default GoalProgressCard;
