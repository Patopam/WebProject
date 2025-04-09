// card para Goals completed y Goals failed.
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GoalStatsCard = ({ title, description, quantity, label }) => {
	return (
		<Card>
			<CardContent>
				<Box>
					<Box>
						<FavoriteBorderIcon />
					</Box>
					<Typography>{title}</Typography>
				</Box>

				<Typography>{description}</Typography>
				<Typography>
					{quantity} {label}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default GoalStatsCard;
