import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const GoalProgressCard = ({ spent = 150000, total = 200000, compact = false, dashboard = false }) => {
	// Calculate progress percentage
	const progressPercentage = (spent / total) * 100;

	// Format currency values
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
				width: dashboard ? '100%' : compact ? 330 : 350,
				minHeight: dashboard ? 170 : 200,
				borderRadius: 3,
				boxShadow: 'none',
				backgroundColor: '#FFF2CC',
			}}
		>
			<CardContent sx={{ padding: dashboard ? '16px' : '24px' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
					<Box
						sx={{
							width: 37,
							height: 37,
							borderRadius: '50%',
							bgcolor: 'rgba(255,255,255,0.5)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							mr: 2,
						}}
					>
						<TrendingUpIcon />
					</Box>
					<Typography variant='body1' sx={{ fontWeight: 300 }}>
						Goal progress
					</Typography>
				</Box>

				<Box sx={{ mt: dashboard ? 1 : 2 }}>
					{' '}
					<Box sx={{ mb: 1 }}>
						<Typography variant='body2' sx={{ fontSize: dashboard ? '0.9rem' : '1rem' }}>
							You have spent {formattedSpent}
						</Typography>
						<Typography variant='body2' sx={{ fontSize: dashboard ? '0.9rem' : '1rem' }}>
							of {formattedTotal}
						</Typography>
					</Box>
					<LinearProgress
						variant='determinate'
						value={progressPercentage}
						sx={{
							my: 1,
							height: 8,
							borderRadius: 1,
							bgcolor: 'rgba(255,255,255,0.5)',
							'& .MuiLinearProgress-bar': {
								bgcolor: '#8BC34A',
							},
						}}
					/>
					<Typography variant='body2' sx={{ fontSize: dashboard ? '0.9rem' : '1rem' }}>
						You are approaching the limit
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default GoalProgressCard;

//Tamaños

{
	/* Versión normal */
}
// <GoalProgressCard />

{
	/* Versión compacta */
}
// <GoalProgressCard compact={true} />

{
	/* Versión dashboard */
}
// <GoalProgressCard dashboard={true} />
