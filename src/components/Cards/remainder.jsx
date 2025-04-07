import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import reminderPhrases from '../../Data/reminderData'; // Import the phrases from separate file

const ReminderCard = () => {
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
				display: 'flex',
				width: '427px',
				height: '238px',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '24px',
				background: '#B7D0EE',
				boxShadow: 'none',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '371px',
					height: '190px',
					flexDirection: 'column',
					alignItems: 'flex-end',
					gap: '20px',
					flexShrink: 0,
					padding: 0,
					'&:last-child': { paddingBottom: 0 },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						alignSelf: 'stretch',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box
							sx={{
								backgroundColor: '#70A1DE',
								borderRadius: '50%',
								width: '37px',
								height: '37px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '10px',
							}}
						>
							<FavoriteBorderIcon sx={{ color: '#333' }} />
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '18px',
								fontWeight: 300,
								color: '#333',
								lineWeight: 'normal',
								fontStyle: 'normal',
							}}
						>
							Remainder
						</Typography>
					</Box>
					<IconButton aria-label='refresh' sx={{ color: '#333' }} onClick={handleRefresh}>
						<RefreshIcon />
					</IconButton>
				</Box>

				<Typography
					variant='p'
					sx={{
						display: 'flex',
						height: '90px',
						flexDirection: 'column',
						justifyContent: 'center',
						flexShrink: '0',
						color: '#333',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '28px',
						fontStyle: 'normal',
						fontWeight: 700,
						lineHeight: '125%',
						alignSelf: 'stretch',
					}}
				>
					{currentPhrase}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ReminderCard;
