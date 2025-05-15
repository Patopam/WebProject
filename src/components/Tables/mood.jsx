import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonBase from '@mui/material/ButtonBase';

const moods = [
	{ id: 'happy', emoji: '😄' },
	{ id: 'sad', emoji: '😭' },
	{ id: 'nostalgic', emoji: '😢' },
	{ id: 'angry', emoji: '😡' },
	{ id: 'neutral', emoji: '😑' },
	{ id: 'stressed', emoji: '😩' },
];

const getMoodEmoji = (moodId) => {
	const mood = moods.find((m) => m.id === moodId);
	return mood ? mood.emoji : '😐';
};

export default function MoodTracker() {
	const uid = useSelector((state) => state.userId.id);
	const [timeRange, setTimeRange] = useState(0);
	const [moodData, setMoodData] = useState([]);
	const [moodSelectorOpen, setMoodSelectorOpen] = useState(false);
	const [currentEditingItemId, setCurrentEditingItemId] = useState(null);
	const today = new Date();

	useEffect(() => {
		if (!uid) return;
		const fetchJournals = async () => {
			try {
				const snapshot = await getDocs(collection(db, `users/${uid}/journals`));
				const data = snapshot.docs.map((doc) => {
					const item = doc.data();
					const dateObj = item.date?.toDate?.() || new Date();
					return {
						id: doc.id,
						title: item.emotion,
						mood: item.emotion,
						date: dateObj.toISOString().split('T')[0],
						displayDate: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
					};
				});
				setMoodData(data);
			} catch (error) {
				console.error('Error fetching journals:', error);
			}
		};
		fetchJournals();
	}, [uid]);

	const handleTimeRangeChange = (event, newValue) => setTimeRange(newValue);
	const openMoodSelector = (id) => {
		setCurrentEditingItemId(id);
		setMoodSelectorOpen(true);
	};
	const handleMoodSelect = (moodId) => {
		setMoodData(moodData.map((item) => (item.id === currentEditingItemId ? { ...item, mood: moodId } : item)));
		setMoodSelectorOpen(false);
	};

	const filterDataByTimeRange = () => {
		const oneDay = 24 * 60 * 60 * 1000;
		const oneWeekAgo = new Date(today.getTime() - 7 * oneDay);
		const oneMonthAgo = new Date(today.getTime() - 30 * oneDay);
		switch (timeRange) {
			case 0:
				return moodData.filter((item) => new Date(item.date).toDateString() === today.toDateString());
			case 1:
				return moodData.filter((item) => new Date(item.date) >= oneWeekAgo && new Date(item.date) <= today);
			case 2:
				return moodData.filter((item) => new Date(item.date) >= oneMonthAgo && new Date(item.date) <= today);
			default:
				return moodData;
		}
	};

	const organizeByMonth = (data) => {
		const organized = {};
		data.forEach((item) => {
			const date = new Date(item.date);
			const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
			if (!organized[monthYear]) organized[monthYear] = [];
			organized[monthYear].push(item);
		});
		Object.keys(organized).forEach((month) => organized[month].sort((a, b) => new Date(b.date) - new Date(a.date)));
		return organized;
	};

	const filteredData = filterDataByTimeRange();
	const organizedData = timeRange === 2 ? organizeByMonth(filteredData) : null;

	const renderListItem = (item) => (
		<StyledListItem key={item.id}>
			<StyledAvatar onClick={() => openMoodSelector(item.id)}>{getMoodEmoji(item.mood)}</StyledAvatar>
			<ListItemText
				primary={item.title}
				primaryTypographyProps={{
					color: '#333',
					fontFamily: 'Manrope, sans-serif',
					fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
					fontWeight: 400,
				}}
				sx={{ flexGrow: 1, marginRight: '2%' }}
			/>
			<StyledChip label={item.displayDate} />
		</StyledListItem>
	);

	const renderContent = () => {
		if (filteredData.length === 0)
			return (
				<Box textAlign='center' py='4%'>
					No entries for this time period
				</Box>
			);
		if (timeRange === 2) {
			return (
				<>
					{Object.keys(organizedData).map((month) => (
						<React.Fragment key={month}>
							<MonthHeader variant='subtitle1'>{month}</MonthHeader>
							<List disablePadding>{organizedData[month].map((item) => renderListItem(item))}</List>
						</React.Fragment>
					))}
				</>
			);
		} else {
			return <List>{filteredData.map((item) => renderListItem(item))}</List>;
		}
	};

	return (
		<StyledPaper elevation={3}>
			<StyledTabs value={timeRange} onChange={handleTimeRangeChange} variant='fullWidth'>
				<StyledTab label='Today' />
				<StyledTab label='Week' />
				<StyledTab label='Month' />
			</StyledTabs>
			<StyledDivider />
			{renderContent()}
			<MoodSelectorModal open={moodSelectorOpen} onClose={() => setMoodSelectorOpen(false)}>
				<MoodSelectorContainer>
					{moods.map((mood) => (
						<MoodOption key={mood.id} onClick={() => handleMoodSelect(mood.id)}>
							{mood.emoji}
						</MoodOption>
					))}
				</MoodSelectorContainer>
			</MoodSelectorModal>
		</StyledPaper>
	);
}

const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: '#CBCBE7',
	borderRadius: '20px',
	padding: theme.spacing(2),
	height: '90vh',
	width: '100%',
	minWidth: '100%',
	overflowY: 'auto',
	margin: '0 auto',
	boxSizing: 'border-box',
	boxShadow: 'none',
}));

const StyledTabs = styled(Tabs)(() => ({
	'& .MuiTabs-indicator': {
		backgroundColor: '#9C9CD2',
	},
}));

const StyledTab = styled(Tab)(() => ({
	color: '#333',
	fontFamily: 'Manrope, sans-serif',
	fontSize: '1.2rem',
	textTransform: 'none',
	fontWeight: 700,
	'&.Mui-selected': {
		color: '#49499D',
		fontWeight: 700,
	},
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
	backgroundColor: 'white',
	borderRadius: '15px',
	marginBottom: theme.spacing(2),
	padding: theme.spacing(1.5, 2),
}));

const StyledAvatar = styled(Avatar)(() => ({
	marginRight: '2%',
	width: '10%',
	maxWidth: '44px',
	height: 'auto',
	aspectRatio: '1/1',
	cursor: 'pointer',
	backgroundColor: '#FFFFFF',
	fontSize: 'clamp(2rem, 2vw, 1.5rem)',
}));

const StyledChip = styled(Chip)(() => ({
	backgroundColor: '#9C9CD2',
	borderRadius: '10px',
	color: 'var(--Neutral-1000, #333)',
	fontFamily: 'Manrope, sans-serif',
	fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
	fontWeight: 400,
}));

const StyledDivider = styled('div')({
	borderBottom: '1px solid #999',
	width: '100%',
	marginBottom: '2%',
});

const MonthHeader = styled(Typography)(() => ({
	color: 'var(--Neutral-1000, #333)',
	fontFamily: 'Manrope, sans-serif',
	fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
	fontWeight: 700,
	marginTop: '2%',
	marginBottom: '1%',
	paddingLeft: '1%',
}));

const MoodSelectorModal = styled(Modal)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const MoodSelectorContainer = styled(Paper)(({ theme }) => ({
	backgroundColor: '#CBCBE7',
	padding: theme.spacing(2),
	borderRadius: '20px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '90%',
	maxWidth: '450px',
}));

const MoodOption = styled(ButtonBase)(() => ({
	width: '12%',
	minWidth: '50px',
	maxWidth: '60px',
	height: 'auto',
	aspectRatio: '1/1',
	fontSize: 'clamp(2rem, 4vw, 3rem)',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'background-color 0.3s',
	'&:hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},
}));
