import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const GoalProgressCard = ({ spent = 150000, total = 200000, compact = false }) => {
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
				borderRadius: '24px',
				background: '#FCE2A9',
				width: compact ? '310px' : '371px',
				height: '182px',
				boxShadow: 'none',
				padding: compact ? '28px' : '28px',
			}}
		>
			<CardContent sx={{ padding: '0px !important' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: 3 }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#FACD69',
							borderRadius: '50%',
							width: compact ? '37px' : '37px',
							height: compact ? '37px' : '37px',
						}}
					>
						<TrendingUpIcon sx={{ color: '#333' }} />
					</Box>
					<Typography
						variant={compact ? 'h6' : 'h5'}
						component='div'
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '18px',
							fontWeight: 300,
							color: '#333',
							lineWeight: 'normal',
							fontStyle: 'normal',
						}}
					>
						Goal progress
					</Typography>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
					{' '}
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
						<Typography variant={compact ? 'h6' : 'h5'} component='div' sx={{ fontWeight: 500 }}>
							You have spent {formattedSpent}
						</Typography>
						<Typography variant='body1' color='text.secondary'>
							of {formattedTotal}
						</Typography>
					</Box>
					<LinearProgress
						variant='determinate'
						value={progressPercentage}
						sx={{
							height: 8,
							borderRadius: 4,
							backgroundColor: '#C8D39F',
							'& .MuiLinearProgress-bar': {
								backgroundColor: '#8C9F49',
								borderRadius: 4,
							},
							mt: 1,
							mb: 1,
						}}
					/>
					<Typography variant='body2' color='text.secondary'>
						You are approaching the limit
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default GoalProgressCard;

{
	/* Versión normal */
}
//<GoalProgressCard spent={150000} total={200000} />

{
	/* Versión compacta */
}
//<GoalProgressCard spent={150000} total={200000} compact={true} />
