import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, LinearProgress, Button } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';
import { getActiveGoalProgress } from '../../services/firebaseUtils';

const GoalProgressCard = () => {
	const uid = useSelector((state) => state.userId.id);
	const [loading, setLoading] = useState(true);
	const [goalData, setGoalData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!uid) return;

		getActiveGoalProgress({ uid }).then((data) => {
			setGoalData(data);
			setLoading(false);
		});
	}, [uid]);

	const renderHeader = () => (
		<Box sx={headerStyle}>
			<Box sx={iconContainer}>
				<TrendingUpIcon sx={{ color: '#333', fontSize: '1.125rem' }} />
			</Box>
			<Typography sx={titleStyle}>Goal progress</Typography>
		</Box>
	);

	if (loading) {
		return (
			<Card sx={cardStyle}>
				<CardContent sx={contentStyle}>
					{renderHeader()}
					<Typography sx={titleStyle}>Loading goal progress...</Typography>
				</CardContent>
			</Card>
		);
	}

	if (!goalData) {
		return (
			<Card sx={cardStyle}>
				<CardContent sx={contentStyle}>
					{renderHeader()}
					<Typography sx={mainValueStyle}>No active goal right now.</Typography>
					<Button variant='contained' onClick={() => navigate('/finance/add-goal')} sx={addButtonStyle}>
						Add new goal
					</Button>
				</CardContent>
			</Card>
		);
	}

	const { spent, total, percentage } = goalData;

	const formattedSpent = `$${spent.toLocaleString('es-CO')}`;
	const formattedTotal = `$${total.toLocaleString('es-CO')}`;

	const limitText =
		percentage >= 100
			? 'Exceed the limit, add your new goal'
			: percentage >= 80
			? 'You are approaching the limit'
			: 'Keep tracking your spending';

	return (
		<Card sx={cardStyle}>
			<CardContent sx={contentStyle}>
				{renderHeader()}

				<Box sx={progressContainer}>
					<Box>
						<Typography sx={mainValueStyle}>You have spent {formattedSpent}</Typography>
						<Typography sx={subValueStyle}>of {formattedTotal}</Typography>
					</Box>

					<LinearProgress
						variant='determinate'
						value={percentage}
						sx={{
							height: '0.5rem',
							borderRadius: '0.25rem',
							backgroundColor: percentage >= 100 ? '#F1B0B7' : '#C8D39F',
							'& .MuiLinearProgress-bar': {
								backgroundColor: percentage >= 100 ? '#B00020' : '#8C9F49',
								borderRadius: '0.25rem',
							},
							margin: '0.4rem 0',
						}}
					/>

					<Typography sx={limitTextStyle}>{limitText}</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default GoalProgressCard;

const cardStyle = {
	display: 'flex',
	flexDirection: 'column',
	flex: '1 1 20rem',
	width: '100%',
	minHeight: '13rem',
	height: '100%',
	borderRadius: '1.5rem',
	background: '#FCE2A9',
	boxShadow: 'none',
	padding: '1.5rem',
	boxSizing: 'border-box',

	'@media screen and (max-width: 767px)': {
		minHeight: '10rem',
		flex: '0 0 auto',
	},
	'@media (max-width: 480px)': {
		minHeight: '11rem',
		padding: '1.2rem',
	},
};

const contentStyle = {
	display: 'flex',
	flexDirection: 'column',
	flexGrow: 1,
	justifyContent: 'space-between',
	padding: '0px !important',
	gap: '1.3rem',
};

const headerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
};

const iconContainer = {
	backgroundColor: '#FACD69',
	borderRadius: '50%',
	width: '2rem',
	height: '2rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const titleStyle = {
	fontFamily: "'Manrope', sans-serif",
	fontSize: '1rem',
	fontWeight: 400,
	color: '#333',
};

const progressContainer = {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.5rem',
	width: '100%',
};

const mainValueStyle = {
	fontFamily: "'Manrope', sans-serif",
	fontWeight: 600,
	fontSize: '1.125rem',
	color: '#000',
	lineHeight: '120%',
};

const subValueStyle = {
	fontSize: '1rem',
	color: '#555',
	fontFamily: "'Manrope', sans-serif",
};

const limitTextStyle = {
	fontSize: '0.875rem',
	color: '#666',
	fontFamily: "'Manrope', sans-serif",
};

const addButtonStyle = {
	backgroundColor: '#FACD69',
	color: '#333',
	textTransform: 'none',
	borderRadius: '12px',
	paddingX: '1.2rem',
	paddingY: '0.5rem',
	fontSize: '0.83rem',
	fontWeight: 550,
	fontFamily: "'Manrope', sans-serif",
	boxShadow: '0px 3px 6px rgba(0, 0, 0, 0)',
	transition: 'all 0.3s ease',
	'&:hover': {
		backgroundColor: '#F4BE4F',
		boxShadow: '0px 3px 8px rgba(50, 50, 50, 0.06)',
	},
};
