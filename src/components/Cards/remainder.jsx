import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import reminderPhrases from '../../Data/reminderData';

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
				width: '100%',
				maxWidth: '40rem', // 640px
				height: 'auto',
				minHeight: '14.875rem', // 238px
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '1.5rem', // 24px
				background: '#B7D0EE',
				boxShadow: 'none',
				padding: '1.75rem',
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '28rem', // 371px
					height: 'auto',
					minHeight: '10.875rem', // 190px
					flexDirection: 'column',
					alignItems: 'flex-end',
					gap: '1.25rem', // 20px
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
								width: '2.31rem', // 37px
								height: '2.31rem', // 37px
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.625rem', // 10px
								flexShrink: 0,
							}}
						>
							<FavoriteBorderIcon sx={{ color: '#333', fontSize: '1.25rem' }} />
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1.125rem', // 18px
								fontWeight: 300,
								color: '#333',
								lineHeight: 'normal',
								fontStyle: 'normal',
							}}
						>
							Remainder
						</Typography>
					</Box>
					<IconButton
						aria-label='refresh'
						sx={{
							color: '#333',
							padding: '0.5rem', 
						}}
						onClick={handleRefresh}
					>
						<RefreshIcon sx={{ fontSize: '1.25rem' }} />
					</IconButton>
				</Box>

				<Typography
					variant='p'
					sx={{
						display: 'flex',
						height: 'auto',
						minHeight: '5.625rem', // 90px
						flexDirection: 'column',
						justifyContent: 'center',
						flexShrink: '0',
						color: '#333',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '1.75rem', // 28px
						fontStyle: 'normal',
						fontWeight: 700,
						lineHeight: '125%',
						alignSelf: 'stretch',
						overflow: 'hidden', // Prevenir desbordamiento con frases largas
						wordWrap: 'break-word', // Asegurar que el texto se ajuste
					}}
				>
					{currentPhrase}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ReminderCard;
