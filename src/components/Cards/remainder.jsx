import { useState } from 'react';
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
				flexDirection: 'column',
				flex: '1 1 20rem',
				width: '100%',
				minHeight: '13rem',
				height: '100%',
				justifyContent: 'flex-start',
				alignItems: 'stretch',
				borderRadius: '1.5rem',
				background: '#B7D0EE',
				boxShadow: 'none',
				padding: '1.5rem',
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					justifyContent: 'flex-start',
					width: '100%',
					padding: 0,
					'&:last-child': { paddingBottom: 0 },
					gap: '1.3rem',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box
							sx={{
								backgroundColor: '#70A1DE',
								borderRadius: '50%',
								width: '2rem',
								height: '2rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.5rem',
							}}
						>
							<FavoriteBorderIcon sx={{ color: '#333', fontSize: '1.125rem' }} />
						</Box>

						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1rem',
								fontWeight: 400,
								color: '#333',
							}}
						>
							Reminder
						</Typography>
					</Box>

					<IconButton
						aria-label='refresh'
						onClick={handleRefresh}
						sx={{ color: '#333', padding: '0.4rem' }}
						disabled={loading}
					>
						<RefreshIcon sx={{ fontSize: '1.125rem' }} />
					</IconButton>
				</Box>

				{/* phrase */}
				<Box sx={{ width: '100%' }}>
					<Typography
						component='span'
						sx={{
							color: '#333',
							fontFamily: "'Manrope', sans-serif",
							fontSize: '1.35rem',
							fontWeight: 600,
							lineHeight: '120%',
							textAlign: 'left',
							wordWrap: 'break-word',
							'@media (max-width: 767px)': {
								fontSize: '1.24rem',
							},
						}}
					>
						{loading ? 'Loading inspiration...' : currentPhrase}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};
export default ReminderCard;
