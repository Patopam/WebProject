import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ Data }) => {
	const emotionToEmoji = {
		happy: '😄',
		angry: '😡',
		sad: '😭',
		stressed: '😩',
		nostalgic: '😢',
		neutral: '😑',
	};

	const today = new Date();
	const dayOfWeek = today.getDay();
	const monday = new Date(today);
	monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
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
		flexDirection: 'column',
		width: '100%',
		height: '320px',
		minHeight: '320px',
		padding: '1.5rem',
		borderRadius: '1.5rem',
		background: '#E3E9CF',
		boxSizing: 'border-box',
		fontFamily: "'Manrope', sans-serif",
		gap: '1rem',
		marginLeft: 'auto',
		marginRight: 'auto',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		marginBottom: '0.5rem',
	};

	const iconContainerStyle = {
		width: '2rem',
		height: '2rem',
		borderRadius: '50%',
		backgroundColor: '#C8D39F',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontSize: '0.95rem',
		fontWeight: 400,
		color: '#333',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	const dayRowStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		gap: '0.7rem',
	};

	const dayColumnStyle = {
		width: '13%',
		minWidth: '2.4rem',
		padding: '4.2rem 0.6rem',
		borderRadius: '1.5rem',
		backgroundColor: '#C8D39F',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		boxSizing: 'border-box',
		flexGrow: 1,
	};

	const dayTextStyle = {
		fontSize: '0.75rem',
		fontWeight: 500,
		color: '#333',
		marginBottom: '0.2rem',
	};

	const dayNumberStyle = {
		fontSize: '1rem',
		fontWeight: 500,
		color: '#333',
		marginBottom: '0.2rem',
	};

	const emojiStyle = {
		fontSize: '1.4rem',
	};

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={iconContainerStyle}>
					<SentimentSatisfiedAlt style={{ fontSize: '1.2rem', color: '#333' }} />
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
