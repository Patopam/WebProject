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
				borderRadius: '1.5rem', // 24px
				background: '#FCE2A9',
				width: '100%',
				maxWidth: compact ? '19.375rem' : '40rem', // 310px o 427px
				height: 'auto',
				minHeight: compact ? '11.375rem' : '14.875rem', // 182px o 238px
				boxShadow: 'none',
				padding: '1.75rem', // 28px uniforme
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
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#FACD69',
							borderRadius: '50%',
							width: '2.31rem', // 37px
							height: '2.31rem', // 37px
							flexShrink: 0,
						}}
					>
						<TrendingUpIcon sx={{ color: '#333', fontSize: '1.25rem' }} />
					</Box>
					<Typography
						variant={compact ? 'h6' : 'h5'}
						component='div'
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '1.125rem', // 18px
							fontWeight: 300,
							color: '#333',
							lineHeight: 'normal',
							fontStyle: 'normal',
						}}
					>
						Goal progress
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0px',
						flexGrow: 1,
						justifyContent: 'space-between',
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
						<Typography
							variant={compact ? 'h6' : 'h5'}
							component='div'
							sx={{
								fontWeight: 500,
								fontSize: compact ? '1rem' : '1.125rem', // 16px o 18px
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							You have spent {formattedSpent}
						</Typography>
						<Typography
							variant='body1'
							color='text.secondary'
							sx={{
								fontSize: compact ? '0.875rem' : '1rem', // 14px o 16px
							}}
						>
							of {formattedTotal}
						</Typography>
					</Box>
					<LinearProgress
						variant='determinate'
						value={progressPercentage}
						sx={{
							height: '0.5rem', // 8px
							borderRadius: '0.25rem', // 4px
							backgroundColor: '#C8D39F',
							'& .MuiLinearProgress-bar': {
								backgroundColor: '#8C9F49',
								borderRadius: '0.25rem', // 4px
							},
							marginTop: '0.625rem', // 10px
							marginBottom: '0.625rem', // 10px
						}}
					/>
					<Typography
						variant='body2'
						color='text.secondary'
						sx={{
							fontSize: compact ? '0.75rem' : '0.875rem', // 12px o 14px
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

{
	/* Versión normal */
}
//<GoalProgressCard spent={150000} total={200000} />

{
	/* Versión compacta */
}
//<GoalProgressCard spent={150000} total={200000} compact={true} />
