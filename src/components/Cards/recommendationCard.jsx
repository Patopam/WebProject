import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';

const RecommendationCard = ({ showInfo, selectedCategory, recommendation, loading, onRefresh }) => {
	return (
		<Card
			sx={{
				display: 'flex',
				width: '100%',
				maxWidth: '40rem',
				minHeight: '14.875rem',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '1.5rem',
				background: showInfo ? '#E3E9CF' : selectedCategory ? getCardColor(selectedCategory) : '#B7D0EE',
				boxShadow: 'none',
				padding: '1.75rem',
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '100%',
					minHeight: '10.875rem',
					flexDirection: 'column',
					alignItems: 'flex-end',
					gap: '1rem',
					padding: 0,
					'&:last-child': { paddingBottom: 0 },
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
								backgroundColor: showInfo ? '#C8D39F' : getDarkerColor(selectedCategory),
								borderRadius: '50%',
								width: '2.31rem',
								height: '2.31rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.625rem',
							}}
						>
							{showInfo ? <InfoIcon sx={{ color: '#333', fontSize: '1.25rem' }} /> : getCategoryIcon(selectedCategory)}
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1.125rem',
								fontWeight: 300,
								color: '#333',
							}}
						>
							{showInfo ? 'Information' : selectedCategory}
						</Typography>
					</Box>
					{!showInfo && (
						<IconButton
							aria-label='refresh'
							onClick={onRefresh}
							sx={{ color: '#333', padding: '0.5rem' }}
							disabled={loading}
						>
							<RefreshIcon sx={{ fontSize: '1.25rem' }} />
						</IconButton>
					)}
				</Box>
				<Typography
					component='span'
					sx={{
						display: 'flex',
						minHeight: '4rem',
						justifyContent: showInfo ? 'flex-start' : 'center',
						color: '#333',
						fontFamily: "'Manrope', sans-serif",
						fontSize: showInfo ? '1.25rem' : '1.75rem',
						fontWeight: showInfo ? 500 : 700,
						lineHeight: '125%',
						alignSelf: 'stretch',
						alignItems: 'center',
						overflow: 'hidden',
						wordWrap: 'break-word',
						textAlign: showInfo ? 'left' : 'left',
						padding: '0 0.5rem',
					}}
				>
					{showInfo
						? 'Here is information about it that the IA brought. Select a category above to get a personalized recommendation.'
						: loading
						? 'Loading recommendation...'
						: recommendation}
				</Typography>
			</CardContent>
		</Card>
	);
};

function getCardColor(category) {
	const colors = {
		'Breathing exercise': '#B7D0EE',
		'Yoga class': '#FACFBB',
		'Healthy habits': '#C8D39F',
		'Money mindset': '#FCE2A9',
		'Self-care tip': '#CBCBE7',
		'Gratitude practice': '#FACFBB',
	};
	return colors[category] || '#B7D0EE';
}

function getDarkerColor(category) {
	const colors = {
		'Breathing exercise': '#70A1DE',
		'Yoga class': '#F69F77',
		'Healthy habits': '#8C9F49',
		'Money mindset': '#FACD69',
		'Self-care tip': '#9C9CD2',
		'Gratitude practice': '#F69F77',
	};
	return colors[category] || '#70A1DE';
}

function getCategoryIcon(category) {
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
