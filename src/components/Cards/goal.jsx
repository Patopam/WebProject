import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { getActiveGoalProgress } from '../../services/firebaseUtils';

const GoalProgressCard = () => {
	const uid = useSelector((state) => state.userId.id);
	const [loading, setLoading] = useState(true);
	const [goalData, setGoalData] = useState(null);

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
					<Typography sx={titleStyle}>No active goal found</Typography>
				</CardContent>
			</Card>
		);
	}

	const { spent, total, percentage } = goalData;
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

	const limitText =
		percentage >= 100
			? 'You have exceeded the limit'
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
