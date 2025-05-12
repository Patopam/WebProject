import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAiLoading } from '../../redux/aiStatusSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMotivationalQuote } from '../../services/openaiService';

const ReminderCard = () => {
	const [currentPhrase, setCurrentPhrase] = useState('Take a breath. You’re doing great.');
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const fetchPhrase = async () => {
		setLoading(true);
		dispatch(setAiLoading(true));
		try {
			const newQuote = await getMotivationalQuote();
			setCurrentPhrase(newQuote);
		} catch (error) {
			console.error('Error fetching motivational quote:', error);
		} finally {
			setLoading(false);
			dispatch(setAiLoading(false));
		}
	};

	const handleRefresh = () => {
		if (!loading) {
			fetchPhrase();
		}
	};

	return (
		<Card
			sx={{
				display: 'flex',
				width: '100%',
				maxWidth: '40rem',
				height: 'auto',
				minHeight: '14.875rem',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '1.5rem',
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
					maxWidth: '28rem',
					minHeight: '10.875rem',
					flexDirection: 'column',
					alignItems: 'flex-end',
					gap: '1.25rem',
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
								width: '2.31rem',
								height: '2.31rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.625rem',
							}}
						>
							<FavoriteBorderIcon sx={{ color: '#333', fontSize: '1.25rem' }} />
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1.125rem',
								fontWeight: 300,
								color: '#333',
							}}
						>
							Reminder
						</Typography>
					</Box>
					<IconButton
						aria-label='refresh'
						onClick={handleRefresh}
						sx={{ color: '#333', padding: '0.5rem' }}
						disabled={loading}
					>
						<RefreshIcon sx={{ fontSize: '1.25rem' }} />
					</IconButton>
				</Box>

				<Typography
					component='span'
					sx={{
						display: 'flex',
						minHeight: '5.625rem',
						justifyContent: 'center',
						color: '#333',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '1.75rem',
						fontWeight: 700,
						lineHeight: '125%',
						alignSelf: 'stretch',
						overflow: 'hidden',
						wordWrap: 'break-word',
					}}
				>
					{loading ? 'Loading inspiration...' : currentPhrase}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ReminderCard;
