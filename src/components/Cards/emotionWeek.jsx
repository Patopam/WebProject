import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false, Data }) => {
	const emotionToEmoji = {
		happy: '😄',
		angry: '😡',
		sad: '😭',
		stressed: '😩',
		nostalgic: '😢',
		neutral: '😑',
	};

	const today = new Date();
	const dayOfWeek = today.getDay(); // 0 (domingo) - 6 (sábado)
	const monday = new Date(today);
	monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); // retroceder hasta lunes
	monday.setHours(0, 0, 0, 0);
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);
	sunday.setHours(23, 59, 59, 999);

	const weekData = Data.filter((entry) => {
		const entryDate = new Date(entry.date.seconds * 1000);
		return entryDate >= monday && entryDate <= sunday;
	});

	const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const weekMap = {};

	for (let i = 0; i < 7; i++) {
		const dayDate = new Date(monday);
		dayDate.setDate(monday.getDate() + i);
		const dayLabel = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
		const dayNum = dayDate.getDate();

		const matchedEntry = weekData.find((entry) => {
			const entryDate = new Date(entry.date.seconds * 1000);
			return entryDate.toDateString() === dayDate.toDateString();
		});

		weekMap[dayLabel] = {
			day: dayLabel,
			dayNum: dayNum,
			emoji: matchedEntry ? emotionToEmoji[matchedEntry.emotion] || '❓' : '–',
		};
	}

	const transformedWeekData = dayNames.map((day) => weekMap[day]);

	const containerStyle = {
		display: 'flex',
		width: compact ? '100%' : '100%',
		maxWidth: compact ? '26.75rem' : '40rem',
		height: '22.5rem',
		padding: compact ? '1.75rem 1.75rem 3.3rem 1.75rem' : '1.75rem 1.75rem 4.2rem 1.75rem',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: compact ? '2.46rem' : '3.13rem',
		borderRadius: '1.5rem',
		background: '#E3E9CF',
		boxSizing: 'border-box',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		width: '100%',
	};

	const iconContainerStyle = {
		width: '2.31rem',
		height: '2.31rem',
		borderRadius: '50%',
		backgroundColor: '#C8D39F',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	};

	const titleStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '1.125rem',
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
		width: compact ? '13%' : '13%',
		minWidth: compact ? '2.6rem' : '3.3rem',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: compact ? '1.25rem 0.625rem' : '1.875rem 1.25rem',
		borderRadius: '1.875rem',
		backgroundColor: '#C8D39F',
		boxSizing: 'border-box',
		aspectRatio: compact ? '41.7/118.01' : '53/150',
	};

	const dayTextStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '1rem',
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
		marginBottom: '0.5rem',
	};

	const dayNumberStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '1.25rem',
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
		margin: '0.5rem 0',
	};

	const emojiStyle = {
		fontSize: compact ? '1.5rem' : '2rem',
		marginTop: '0.5rem',
	};

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={iconContainerStyle}>
					<SentimentSatisfiedAlt style={{ fontSize: '1.5rem', color: '#333' }} />
				</div>
				<div style={titleStyle}>Emotion week</div>
			</div>
			<div style={dayRowStyle}>
				{transformedWeekData.map((item, index) => (
					<div key={index} style={dayColumnStyle}>
						<div style={dayTextStyle}>{item.day}</div>
						<div style={dayNumberStyle}>{item.dayNum}</div>
						<div style={emojiStyle}>{item.emoji}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmotionWeek;
