import React from 'react';
import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false }) => {
	const containerStyle = {
		display: 'flex',
		width: compact ? '428px' : '544px',
		height: compact ? '268.29px' : '341px',
		padding: compact ? '24.39px 29.90px 52.71px 30.68px' : '31px 38px 67px 39px',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: compact ? '39.42px' : '50.1px',
		borderRadius: '20px', // según --Radio-2
		background: '#E3E9CF',
		boxSizing: 'border-box',
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
		width: compact ? '41.7px' : '53px',
		height: compact ? '118.01px' : '150px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '15px 0',
		borderRadius: compact ? '23.6px' : '30px',
		backgroundColor: '#C8D39F',
		boxSizing: 'border-box',
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
