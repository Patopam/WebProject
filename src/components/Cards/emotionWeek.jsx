import React from 'react';
import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false, dashboard = false }) => {
	// Si dashboard es true, usamos medidas específicas para el dashboard
	const containerStyle = {
		display: 'flex',
		width: dashboard ? '100%' : compact ? '428px' : '544px',
		height: dashboard ? '286px' : compact ? '268px' : '341px',
		padding: dashboard ? '20px' : compact ? '28px 28px 52px 28px' : '28px 28px 67px 28px',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: dashboard ? '20px' : compact ? '39px' : '50px',
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
		width: '37px',
		height: '37px',
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
		lineHeight: 'normal',
		fontStyle: 'normal',
	};

	const dayRowStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	};

	const dayColumnStyle = {
		width: dashboard ? '48px' : compact ? '41px' : '53px',
		height: dashboard ? '160px' : compact ? '118px' : '150px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: dashboard ? '15px 5px' : compact ? '20px 10px' : '30px 20px',
		borderRadius: '30px',
		backgroundColor: '#C8D39F',
		boxSizing: 'border-box',
	};

	const dayTextStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: dashboard ? '14px' : '16px',
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
	};

	const dayNumberStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: dashboard ? '18px' : '20px',
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
	};

	const emojiStyle = {
		fontSize: dashboard ? '24px' : compact ? '24px' : '32px',
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
					<SentimentSatisfiedAlt size={24} style={{ color: '#333' }} />
				</div>
				<span style={titleStyle}>Emotion week</span>
			</div>

			<div style={dayRowStyle}>
				{weekData.map((item, index) => (
					<div key={index} style={dayColumnStyle}>
						<span style={dayTextStyle}>{item.day}</span>
						<span style={dayNumberStyle}>25</span>
						<span style={emojiStyle}>{item.emoji}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmotionWeek;

//Tamaños

{
	/* Versión normal */
}
// <EmotionWeek />

{
	/* Versión compacta */
}
// <EmotionWeek compact={true} />

{
	/* Versión dashboard */
}
// <EmotionWeek dashboard={true} />
