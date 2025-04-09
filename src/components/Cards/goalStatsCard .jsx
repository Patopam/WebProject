import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GoalStatsCard = ({ title, description, quantity, label, bgColor, iconBg }) => {
	return (
		<Card sx={{ backgroundColor: bgColor, borderRadius: '24px', boxShadow: 'none' }}>
			<CardContent>
				{/* Header */}
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
					<Box
						sx={{
							backgroundColor: iconBg,
							borderRadius: '50%',
							width: 37,
							height: 37,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<FavoriteBorderIcon sx={{ color: '#333' }} />
					</Box>
					<Typography variant='h6' sx={{ fontWeight: 400 }}>
						{title}
					</Typography>
				</Box>

				{/* Description */}
				<Typography variant='body1' sx={{ marginBottom: '8px' }}>
					{description}
				</Typography>

				<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
					{quantity} {label}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default GoalStatsCard;
