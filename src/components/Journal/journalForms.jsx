import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { doc, getDoc } from 'firebase/firestore';
import { addJournal, updateJournal } from '../../services/firebaseUtils';
import { db } from '../../services/firebase';
import { Box, Typography, TextField, Button, IconButton, styled } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import SendIcon from '@mui/icons-material/Send';

export default function JournalForm({ compact = false, redirectTo }) {
	const { id: journalId } = useParams();
	const uid = useSelector((state) => state.userId.id);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [entryText, setEntryText] = useState('');
	const [entryTitle, setEntryTitle] = useState('');
	const [selectedFeeling, setSelectedFeeling] = useState(null);
	const [selectedTags, setSelectedTags] = useState([]);
	const [originalData, setOriginalData] = useState({});
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

	const emojis = [
		{ emoji: '😄', value: 'happy' },
		{ emoji: '😭', value: 'sad' },
		{ emoji: '😢', value: 'nostalgic' },
		{ emoji: '😡', value: 'angry' },
		{ emoji: '😑', value: 'neutral' },
		{ emoji: '😩', value: 'stressed' },
	];

	const tags = ['Reflection', 'Gratitude', 'Daily Intention', 'Release'];
	const templates = {
		Reflection: "Today I'm reflecting on...\n\nWhat went well:\n\nWhat could have gone better:\n\nWhat I learned:",
		Gratitude: "Today I'm grateful for:\n\n1.\n2.\n3.\n\nWhy these matter to me:",
		'Daily Intention': 'My intention for today is:\n\nHow I plan to achieve this:\n\nHow I will measure success:',
		Release: "What I need to let go of:\n\nWhy I'm holding onto it:\n\nHow I will release it:",
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 767);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (journalId && uid) {
			const fetchJournal = async () => {
				const docRef = doc(db, 'users', uid, 'journals', journalId);
				const snapshot = await getDoc(docRef);
				if (snapshot.exists()) {
					const data = snapshot.data();
					setEntryTitle(data.title || '');
					setEntryText(data.description || '');
					const emotion = emojis.find((e) => e.value === data.emotion);
					setSelectedFeeling(emotion || null);
					setOriginalData({
						title: data.title,
						description: data.description,
						emotion: data.emotion,
					});
				}
			};
			fetchJournal();
		}
	}, [journalId, uid]);

	const handleTagClick = (tag) => {
		if (journalId) return;
		if (selectedTags.includes(tag)) {
			setSelectedTags([]);
			setEntryText('');
		} else {
			setSelectedTags([tag]);
			setEntryText(templates[tag]);
			if (!entryTitle) {
				setEntryTitle(`My ${tag} - ${new Date().toLocaleDateString()}`);
			}
		}
	};

	const toggleExpand = () => {
		const hasChanges =
			entryTitle !== originalData.title ||
			entryText !== originalData.description ||
			selectedFeeling?.value !== originalData.emotion;

		if (journalId && hasChanges) {
			enqueueSnackbar('You have unsaved changes. Please save first.', { variant: 'warning' });
			return;
		}

		navigate(compact ? '/journal/write' : -1);
	};

	const save = async () => {
		if (!entryTitle || !entryText || !selectedFeeling) {
			alert('Please complete the journal before saving.');
			return;
		}
		if (!uid) {
			alert('User ID missing. Please log in again.');
			return;
		}

		if (journalId) {
			await updateJournal({ uid, journalId, title: entryTitle, description: entryText });
			enqueueSnackbar('Journal updated successfully', { variant: 'success' });
		} else {
			await addJournal({ uid, emotion: selectedFeeling.value, title: entryTitle, description: entryText });
			enqueueSnackbar('Journal saved successfully', { variant: 'success' });
		}

		setTimeout(() => {
			navigate(redirectTo || '/Alljournal');
		}, 1500);
	};

	return (
		<JournalContainer compact={compact}>
			<HeaderSection>
				<TitleGroup>
					<IconCircle>
						<SentimentSatisfiedOutlinedIcon sx={{ color: '#000', fontSize: isMobile ? 18 : 20 }} />
					</IconCircle>
					<Typography sx={{ fontSize: isMobile ? 16 : 18, fontWeight: 600 }}>
						{journalId ? 'Edit your journal' : 'Write what you feel'}
					</Typography>
				</TitleGroup>
				<IconButton onClick={toggleExpand}>
					{compact ? <OpenInFullOutlinedIcon sx={{ color: '#000' }} /> : <CloseFullscreenIcon sx={{ color: '#000' }} />}
				</IconButton>
			</HeaderSection>

			<Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>How do you feel today?</Typography>
			<EmojiWrapper>
				{emojis.map((item) => (
					<EmojiButton
						key={item.value}
						selected={selectedFeeling?.value === item.value}
						onClick={() => {
							if (!journalId) setSelectedFeeling(item);
						}}
						sx={{
							cursor: journalId ? 'default' : 'pointer',
							opacity: journalId && selectedFeeling?.value !== item.value ? 0.4 : 1,
						}}
					>
						{item.emoji}
					</EmojiButton>
				))}
			</EmojiWrapper>

			<TagWrapper>
				{tags.map((tag) => (
					<TagButton
						key={tag}
						selected={selectedTags.includes(tag) || entryText.startsWith(templates[tag])}
						onClick={() => handleTagClick(tag)}
						sx={{ pointerEvents: journalId ? 'none' : 'auto', opacity: journalId ? 0.6 : 1 }}
					>
						{tag}
					</TagButton>
				))}
			</TagWrapper>

			<EntrySection compact={compact}>
				<EntryTitle
					fullWidth
					placeholder='Title'
					value={entryTitle}
					onChange={(e) => setEntryTitle(e.target.value)}
					InputProps={{ disableUnderline: true }}
				/>
				<EntryTextArea
					fullWidth
					multiline
					placeholder='Write here...'
					minRows={compact ? 5 : isMobile ? 8 : 10}
					value={entryText}
					onChange={(e) => setEntryText(e.target.value)}
				/>
			</EntrySection>

			<SaveButtonWrapper>
				<SaveButton onClick={save}>
					<IconCircle bgcolor={journalId ? '#f6d776' : '#f6d776'}>
						{journalId ? (
							<SendIcon sx={{ color: '#000', fontSize: 20 }} />
						) : (
							<TurnedInNotOutlinedIcon sx={{ color: '#000', fontSize: 20 }} />
						)}
					</IconCircle>
					<span>Save</span>
				</SaveButton>
			</SaveButtonWrapper>
		</JournalContainer>
	);
}

const HOVER_COLOR = '#fcd48f';
const JournalContainer = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'compact',
})(({ compact }) => ({
	backgroundColor: '#fde3a7',
	padding: compact ? '24px' : '2.5rem 3.75rem',
	borderRadius: '1.5rem',
	width: '100%',
	maxWidth: compact ? '100%' : '75rem',
	margin: '0 auto',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
}));

const HeaderSection = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '1rem',
});

const TitleGroup = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
});

const IconCircle = styled(Box)(({ bgcolor = '#FACD69' }) => ({
	backgroundColor: bgcolor,
	width: '2rem',
	height: '2rem',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const EmojiWrapper = styled(Box)({
	display: 'flex',
	gap: '16px',
	backgroundColor: '#FACD69',
	padding: '10px 16px',
	borderRadius: '12px',
	marginBottom: '16px',
});

const EmojiButton = styled(Box)(({ selected }) => ({
	fontSize: '26px',
	cursor: 'pointer',
	transform: selected ? 'scale(1.3)' : 'scale(1)',
	transition: 'transform 0.2s ease',
}));

const TagWrapper = styled(Box)({
	display: 'flex',
	gap: '8px',
	marginBottom: '16px',
	flexWrap: 'wrap',
});

const TagButton = styled(Button)(({ selected }) => ({
	backgroundColor: selected ? '#F69F77' : '#FACD69',
	borderRadius: '16px',
	padding: '6px 12px',
	textTransform: 'none',
	fontWeight: 500,
	fontSize: '14px',
	color: '#000',
	'&:hover': {
		backgroundColor: HOVER_COLOR,
		opacity: 0.9,
	},
}));

const EntrySection = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'compact',
})(({ compact }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
	backgroundColor: '#fde3a7',
	border: '2px solid #f6d776',
	borderRadius: '16px',
	padding: '16px',
	marginBottom: '20px',
	flex: compact ? 'none' : 1,
}));

const EntryTitle = styled(TextField)({
	'& .MuiInputBase-root': {
		fontFamily: '"Manrope", sans-serif',
		fontSize: '16px',
		fontWeight: 600,
		color: '#000',
	},
	'& .MuiInputBase-input': {
		padding: '4px 0',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
	'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
});

const EntryTextArea = styled(TextField, {
	shouldForwardProp: (prop) => prop !== 'compact',
})(({ compact }) => ({
	'& .MuiInputBase-root': {
		fontFamily: '"Manrope", sans-serif',
		fontSize: '14px',
		color: '#333',
		height: compact ? 'auto' : '100%',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
	flex: compact ? 'none' : 1,
}));

const SaveButtonWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
});

const SaveButton = styled(Button)({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
	padding: '12px 20px',
	backgroundColor: '#FACD69',
	borderRadius: '12px',
	cursor: 'pointer',
	fontSize: '16px',
	fontWeight: 500,
	textTransform: 'none',
	color: '#000',
	fontFamily: '"Manrope", sans-serif',
	'&:hover': {
		backgroundColor: HOVER_COLOR,
		opacity: 0.9,
	},
});
