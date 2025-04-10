import React from 'react';
import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false }) => {
	const containerStyle = {
		display: 'flex',
		width: compact ? '428px' : '544px',
		height: compact ? '268.29px' : '341px',
		padding: compact ? '28px 28px 52.71px 28px' : '28px 28px 67px 28px',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: compact ? '39.42px' : '50.1px',
		borderRadius: '24px',
		background: '#E3E9CF',
		boxSizing: 'border-box',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
	};

	const iconContainerStyle = {
		width: compact ? '37px' : '37px',
		height: compact ? '37px' : '37px',
		borderRadius: '50%',
		backgroundColor: '#C8D39F',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '18px',
		fontWeight: 300,
		color: '#333',
		lineWeight: 'normal',
		fontStyle: 'normal',
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
		padding: compact ? '20px 10px' : '30px 20px ',
		borderRadius: compact ? '30px' : '30px',
		backgroundColor: '#C8D39F',
		boxSizing: 'border-box',
	};

	const dayTextStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '16px',
		fontWeight: 500,
		color: '#333',
		lineWeight: '110%',
		fontStyle: 'normal',
	};

	const dayNumberStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '20px',
		fontWeight: 500,
		color: '#333',
		lineWeight: '110%',
		fontStyle: 'normal',
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
					<SentimentSatisfiedAlt style={{ fontSize: compact ? '24px' : '24px', color: '#333' }} />
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
