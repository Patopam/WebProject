import React, { useState } from 'react';
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
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import ButtonBase from '@mui/material/ButtonBase';

const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: '#CBCBE7',
	borderRadius: 20,
	padding: theme.spacing(2),
	height: '80vh', // Altura exacta mínima como pediste
	width: '664px', // Ancho exacto
	overflowY: 'auto', // Por si hay scroll interno
	margin: '0 auto',
	boxSizing: 'border-box',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
	backgroundColor: 'white',
	borderRadius: 15,
	marginBottom: theme.spacing(2),
	padding: theme.spacing(1.5, 2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	marginRight: theme.spacing(2),
	width: 38,
	height: 38,
	cursor: 'pointer',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
	backgroundColor: '#cacbdf',
	color: '#444',
	borderRadius: 12,
	fontWeight: 'bold',
}));

const StyledDivider = styled('div')({
	borderBottom: '1px solid #999',
	width: '100%',
	marginBottom: '16px',
});

const MonthHeader = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(1),
	paddingLeft: theme.spacing(1),
}));

const MoodSelectorModal = styled(Modal)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const MoodSelectorContainer = styled(Paper)(({ theme }) => ({
	backgroundColor: '#f8d685',
	padding: theme.spacing(2),
	borderRadius: 12,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '90%',
	maxWidth: 450,
}));

const MoodOption = styled(ButtonBase)(({ theme }) => ({
	width: 50,
	height: 50,
	fontSize: 30,
	borderRadius: '50%',
	'&:hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},
}));

// Dataset with one entry per day
const initialMoodData = [
	{ id: 1, title: 'Morning meditation complete', mood: 'happy', date: '2025-04-06', displayDate: 'Apr 6' },
	{ id: 2, title: 'Work deadline stress', mood: 'angry', date: '2025-04-05', displayDate: 'Apr 5' },
	{ id: 3, title: 'Great lunch with friends', mood: 'happy', date: '2025-04-04', displayDate: 'Apr 4' },
	{ id: 4, title: 'Successful presentation', mood: 'happy', date: '2025-04-03', displayDate: 'Apr 3' },
	{ id: 5, title: 'Argument with roommate', mood: 'angry', date: '2025-04-02', displayDate: 'Apr 2' },
	{ id: 6, title: 'Completed project', mood: 'happy', date: '2025-04-01', displayDate: 'Apr 1' },
	{ id: 7, title: 'Great movie night', mood: 'happy', date: '2025-03-31', displayDate: 'Mar 31' },
	{ id: 8, title: 'Weekend hike', mood: 'happy', date: '2025-03-28', displayDate: 'Mar 28' },
	{ id: 9, title: 'Fight with partner', mood: 'angry', date: '2025-03-15', displayDate: 'Mar 15' },
	{ id: 10, title: 'Birthday celebration', mood: 'happy', date: '2025-03-10', displayDate: 'Mar 10' },
];

const moods = [
	{ id: 'laughing', emoji: '😄' },
	{ id: 'crying', emoji: '😢' },
	{ id: 'anxious', emoji: '😰' },
	{ id: 'angry', emoji: '😠' },
	{ id: 'neutral', emoji: '😐' },
	{ id: 'sad', emoji: '😩' },
];

const getMoodEmoji = (moodId) => {
	const mood = moods.find((m) => m.id === moodId);
	return mood ? mood.emoji : '😐';
};

export default function MoodTracker() {
	const [timeRange, setTimeRange] = useState(0);
	const [moodData, setMoodData] = useState(initialMoodData);
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState('');
	const [moodSelectorOpen, setMoodSelectorOpen] = useState(false);
	const [currentEditingItemId, setCurrentEditingItemId] = useState(null);

	const today = new Date('2025-04-06'); // Using the current date from your example

	const handleTimeRangeChange = (event, newValue) => {
		setTimeRange(newValue);
	};

	const startEditing = (id, title) => {
		setEditingId(id);
		setEditValue(title);
	};

	const saveEdit = (id) => {
		setMoodData(moodData.map((item) => (item.id === id ? { ...item, title: editValue } : item)));
		setEditingId(null);
	};

	const cancelEdit = () => {
		setEditingId(null);
	};

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
			case 0: // Today
				return moodData.filter((item) => {
					const itemDate = new Date(item.date);
					return itemDate.toDateString() === today.toDateString();
				});
			case 1: // Week
				return moodData.filter((item) => {
					const itemDate = new Date(item.date);
					return itemDate >= oneWeekAgo && itemDate <= today;
				});
			case 2: // Month
				return moodData.filter((item) => {
					const itemDate = new Date(item.date);
					return itemDate >= oneMonthAgo && itemDate <= today;
				});
			default:
				return moodData;
		}
	};

	const organizeByMonth = (data) => {
		const organized = {};

		data.forEach((item) => {
			const date = new Date(item.date);
			const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

			if (!organized[monthYear]) {
				organized[monthYear] = [];
			}

			organized[monthYear].push(item);
		});

		// Sort entries within each month by date (descending)
		Object.keys(organized).forEach((month) => {
			organized[month].sort((a, b) => new Date(b.date) - new Date(a.date));
		});

		return organized;
	};

	const filteredData = filterDataByTimeRange();
	const organizedData = timeRange === 2 ? organizeByMonth(filteredData) : null;

	const renderListItem = (item) => (
		<StyledListItem key={item.id}>
			<StyledAvatar onClick={() => openMoodSelector(item.id)} sx={{ cursor: 'pointer' }}>
				{getMoodEmoji(item.mood)}
			</StyledAvatar>

			{editingId === item.id ? (
				<Box display='flex' alignItems='center' flexGrow={1} mr={1}>
					<TextField
						fullWidth
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						size='small'
						autoFocus
					/>
					<IconButton size='small' onClick={() => saveEdit(item.id)}>
						<CheckIcon fontSize='small' />
					</IconButton>
					<IconButton size='small' onClick={cancelEdit}>
						<CloseIcon fontSize='small' />
					</IconButton>
				</Box>
			) : (
				<>
					<ListItemText
						primary={item.title}
						primaryTypographyProps={{
							fontSize: 18,
							fontWeight: 'medium',
						}}
					/>
					<IconButton size='small' onClick={() => startEditing(item.id, item.title)} sx={{ mr: 1 }}>
						<EditIcon fontSize='small' />
					</IconButton>
				</>
			)}

			<StyledChip label={item.displayDate} />
		</StyledListItem>
	);

	const renderContent = () => {
		if (filteredData.length === 0) {
			return (
				<Box textAlign='center' py={4}>
					No entries for this time period
				</Box>
			);
		}

		if (timeRange === 2) {
			// Month view with organization
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
			// Today or Week view
			return <List>{filteredData.map((item) => renderListItem(item))}</List>;
		}
	};

	return (
		<StyledPaper elevation={3}>
			<Tabs
				value={timeRange}
				onChange={handleTimeRangeChange}
				variant='fullWidth'
				indicatorColor='primary'
				textColor='primary'
				aria-label='time range tabs'
			>
				<Tab label='Today' />
				<Tab label='Week' />
				<Tab label='Month' />
			</Tabs>

			<StyledDivider />

			{renderContent()}

			<MoodSelectorModal
				open={moodSelectorOpen}
				onClose={() => setMoodSelectorOpen(false)}
				aria-labelledby='mood-selector-modal'
			>
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
