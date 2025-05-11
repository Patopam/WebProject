import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';

const RecommendationCard = ({ showInfo, selectedCategory, recommendation, loading, onRefresh }) => {
	return showInfo ? (
		// Information card displayed when no category is selected
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
				background: '#C3CF90', // Green-ish color like in the image
				boxShadow: 'none',
				padding: '1.75rem',
				boxSizing: 'border-box',
				marginTop: '20px',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '28rem',
					minHeight: '10.875rem',
					flexDirection: 'column',
					gap: '1.25rem',
					padding: 0,
					'&:last-child': { paddingBottom: 0 },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
						alignSelf: 'stretch',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box
							sx={{
								backgroundColor: '#A9B576', // Darker green for the icon background
								borderRadius: '50%',
								width: '2.31rem',
								height: '2.31rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.625rem',
							}}
						>
							<InfoIcon sx={{ color: '#333', fontSize: '1.25rem' }} />
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1.125rem',
								fontWeight: 300,
								color: '#333',
							}}
						>
							Information
						</Typography>
					</Box>
				</Box>

				<Typography
					component='span'
					sx={{
						display: 'flex',
						minHeight: '5.625rem',
						justifyContent: 'flex-start',
						color: '#333',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '1.25rem',
						fontWeight: 500,
						lineHeight: '125%',
						alignSelf: 'stretch',
						overflow: 'hidden',
						wordWrap: 'break-word',
					}}
				>
					Here is information about it that the IA brought. Select a category above to get a personalized
					recommendation.
				</Typography>
			</CardContent>
		</Card>
	) : (
		// Recommendation card displayed when a category is selected
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
				background: selectedCategory ? getCardColor(selectedCategory) : '#B7D0EE',
				boxShadow: 'none',
				padding: '1.75rem',
				boxSizing: 'border-box',
				marginTop: '20px',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '28rem',
					minHeight: '10.875rem',
					flexDirection: 'column',
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
								backgroundColor: getDarkerColor(selectedCategory),
								borderRadius: '50%',
								width: '2.31rem',
								height: '2.31rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.625rem',
							}}
						>
							{getCategoryIcon(selectedCategory)}
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1.125rem',
								fontWeight: 300,
								color: '#333',
							}}
						>
							{selectedCategory}
						</Typography>
					</Box>
					<IconButton
						aria-label='refresh'
						onClick={onRefresh}
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
						fontSize: '1.5rem',
						fontWeight: 600,
						lineHeight: '125%',
						alignSelf: 'stretch',
						alignItems: 'center',
						overflow: 'hidden',
						wordWrap: 'break-word',
					}}
				>
					{loading ? 'Loading recommendation...' : recommendation}
				</Typography>
			</CardContent>
		</Card>
	);
};

// Helper functions for card styling
function getCardColor(category) {
	const colors = {
		'Breathing exercise': '#B7D0EE', // Blue
		'Yoga class': '#FFD6A5', // Orange
		'Healthy habits': '#C3CF90', // Green
		'Money mindset': '#A0D2EB', // Light blue
		'Self-care tip': '#FFDDE1', // Pink
		'Gratitude practice': '#D4A5FF', // Purple
	};
	return colors[category] || '#B7D0EE';
}

function getDarkerColor(category) {
	const colors = {
		'Breathing exercise': '#70A1DE', // Darker blue
		'Yoga class': '#FFB26B', // Darker orange
		'Healthy habits': '#A9B576', // Darker green
		'Money mindset': '#7BAFD0', // Darker light blue
		'Self-care tip': '#FFBAC3', // Darker pink
		'Gratitude practice': '#B87EFF', // Darker purple
	};
	return colors[category] || '#70A1DE';
}

function getCategoryIcon(category) {
	// Placeholder icons using text characters
	// In a real application, you would import and use proper icons
	const iconStyle = { color: '#333', fontSize: '1.25rem' };

	switch (category) {
		case 'Breathing exercise':
			return <span style={iconStyle}>🫁</span>;
		case 'Yoga class':
			return <span style={iconStyle}>🧘</span>;
		case 'Healthy habits':
			return <span style={iconStyle}>🥗</span>;
		case 'Money mindset':
			return <span style={iconStyle}>💰</span>;
		case 'Self-care tip':
			return <span style={iconStyle}>💆</span>;
		case 'Gratitude practice':
			return <span style={iconStyle}>🙏</span>;
		default:
			return <InfoIcon sx={iconStyle} />;
	}
}

export default RecommendationCard;
