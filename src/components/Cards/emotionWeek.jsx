import React from 'react';
import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false }) => {
	// Styles based on the size
	const containerStyle = {
		display: 'flex',
		width: compact ? '428px' : '544px',
		height: compact ? '268px' : '341px',
		padding: compact ? '24px 30px 53px 31px' : '31px 38px 67px 39px',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: compact ? '39px' : '50px',
		borderRadius: '16px',
		background: '#E3E9CF',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
	};

	const iconContainerStyle = {
		width: compact ? '32px' : '40px',
		height: compact ? '32px' : '40px',
		borderRadius: '50%',
		backgroundColor: '#CDD6A8',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontFamily: 'Arial, sans-serif',
		fontSize: compact ? '22px' : '28px',
		fontWeight: '400',
		color: '#333',
	};

	const dayRowStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	};

	const dayColumnStyle = {
		width: compact ? '42px' : '53px',
		height: compact ? '118px' : '150px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '15px 0',
		borderRadius: '30px',
		backgroundColor: '#C8D39F',
	};

	const dayTextStyle = {
		fontFamily: 'Arial, sans-serif',
		fontSize: compact ? '12px' : '14px',
		color: '#333',
	};

	const dayNumberStyle = {
		fontFamily: 'Arial, sans-serif',
		fontSize: compact ? '18px' : '22px',
		fontWeight: 'bold',
		color: '#333',
	};

	const emojiStyle = {
		fontSize: compact ? '24px' : '32px',
	};

	// Data for the emotion week
	const weekData = [
		{ day: 'Mon', emoji: '😊' },
		{ day: 'Tus', emoji: '😣' },
		{ day: 'Wed', emoji: '😠' },
		{ day: 'Thu', emoji: '😢' },
		{ day: 'Fri', emoji: '😊' },
		{ day: 'Sat', emoji: '😠' },
		{ day: 'Sun', emoji: '😊' },
	];

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={iconContainerStyle}>
					<SentimentSatisfiedAlt style={{ fontSize: compact ? '20px' : '24px', color: '#333' }} />
				</div>
				<div style={titleStyle}>Emotion week</div>
			</div>

			<div style={dayRowStyle}>
				{weekData.map((item, index) => (
					<div key={index} style={dayColumnStyle}>
						<div style={dayTextStyle}>{item.day}</div>
						<div style={dayNumberStyle}>25</div>
						<div style={emojiStyle}>{item.emoji}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmotionWeek;
