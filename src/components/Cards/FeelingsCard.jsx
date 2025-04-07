import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';

const FeelingsCard = ({ dashboard = false }) => {
	return (
		<Card
			sx={{
				width: dashboard ? '100%' : 350,
				minHeight: dashboard ? 170 : 200,
				borderRadius: 3,
				boxShadow: 'none',
				backgroundColor: '#FFDDD6',
			}}
		>
			<CardContent sx={{ padding: dashboard ? '16px' : '24px' }}>
				{/* Header */}
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
						<FlashOnOutlinedIcon />
					</Box>
					<Typography variant='body1' sx={{ fontWeight: 300 }}>
						Feelings & Finances
					</Typography>
				</Box>

				{/* Content */}
				<Box sx={{ mt: dashboard ? 1 : 2 }}>
					<Typography
						variant='h3'
						sx={{
							fontWeight: 'bold',
							fontSize: dashboard ? '2.2rem' : '2.5rem',
						}}
					>
						50%
					</Typography>
					<Typography
						variant='body2'
						sx={{
							mt: dashboard ? 0.5 : 1,
							fontSize: dashboard ? '0.9rem' : '1rem',
						}}
					>
						Of your <b>expenses</b> are when you are
					</Typography>
				</Box>

				<Box sx={{ mt: dashboard ? 0.5 : 1 }}>
					<Typography
						variant='h5'
						sx={{
							fontWeight: 'bold',
							fontSize: dashboard ? '1.5rem' : '1.75rem',
						}}
					>
						stressed
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default FeelingsCard;

// Uso:
// <FeelingsCard /> // Normal
// <FeelingsCard dashboard={true} /> // Versión para dashboard
