import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import reminderPhrases from '../../Data/reminderData'; // Import the phrases from separate file

const ReminderCard = ({ dashboard = false }) => {
	// State to manage the current phrase
	const [currentPhrase, setCurrentPhrase] = useState('');

	// Function to get a random phrase
	const getRandomPhrase = () => {
		const randomIndex = Math.floor(Math.random() * reminderPhrases.length);
		return reminderPhrases[randomIndex];
	};

	// Initial phrase load and refresh functionality
	useEffect(() => {
		setCurrentPhrase(getRandomPhrase());
	}, []);

	// Handle refresh click
	const handleRefresh = () => {
		let newPhrase = getRandomPhrase();
		// Avoid showing the same phrase twice in a row
		while (newPhrase === currentPhrase) {
			newPhrase = getRandomPhrase();
		}
		setCurrentPhrase(newPhrase);
	};

	return (
		<Card
			sx={{
				width: dashboard ? '100%' : 350,
				minHeight: dashboard ? 170 : 200,
				borderRadius: 3,
				boxShadow: 'none',
				backgroundColor: '#D9EAFF',
			}}
		>
			<CardContent sx={{ padding: dashboard ? '16px' : '24px' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 2,
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
							<FavoriteBorderIcon />
						</Box>
						<Typography variant='body1' sx={{ fontWeight: 300 }}>
							Remainder
						</Typography>
					</Box>
					<IconButton
						size='small'
						onClick={handleRefresh}
						sx={{
							color: 'text.primary',
							padding: dashboard ? '4px' : '8px',
						}}
					>
						<RefreshIcon />
					</IconButton>
				</Box>

				<Typography
					variant='h5'
					sx={{
						fontWeight: dashboard ? 500 : 600,
						fontSize: dashboard ? '1.25rem' : '1.5rem',
						lineHeight: 1.3,
					}}
				>
					{currentPhrase}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ReminderCard;

// Uso:
// <ReminderCard /> // Normal
// <ReminderCard dashboard={true} /> // Versión para dashboard
