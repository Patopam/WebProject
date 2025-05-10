import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, styled } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

// Color de hover unificado
const HOVER_COLOR = '#fcd48f';

// Styled components
const JournalContainer = styled(Box)(({ theme, compact }) => ({
	backgroundColor: '#fde3a7',
	padding: compact ? '24px' : '2.5rem 3.75rem',
	fontFamily: '"Manrope", sans-serif',
	borderRadius: '1.5rem', // 24px
	width: '100%',
	maxWidth: compact ? '100%' : '75rem',
	margin: '0 auto',
	boxSizing: 'border-box',
	height: compact ? 'auto' : '100%',
	display: 'flex',
	flexDirection: 'column',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '1rem',
}));

const TitleGroup = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
}));

const IconCircle = styled(Box)(({ bgcolor = '#FACD69' }) => ({
	backgroundColor: bgcolor,
	width: '2rem',
	height: '2rem',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const FeelingsSection = styled(Box)(({ theme }) => ({
	marginBottom: '16px',
}));

const FeelingsLabel = styled(Typography)(({ theme }) => ({
	fontSize: '14px',
	marginBottom: '12px',
	fontWeight: 600,
}));

const EmojiWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '16px',
	backgroundColor: '#FACD69',
	padding: '10px 16px',
	borderRadius: '12px',
	marginBottom: '16px',
}));

const EmojiButton = styled(Box)(({ selected }) => ({
	fontSize: '26px',
	cursor: 'pointer',
	transition: 'transform 0.2s ease',
	transform: selected ? 'scale(1.3)' : 'scale(1)',
}));

const TagWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '8px',
	marginBottom: '16px',
	flexWrap: 'wrap',
}));

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

const EntrySection = styled(Box)(({ theme, compact }) => ({
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

const EntryTitle = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-root': {
		fontFamily: '"Manrope", sans-serif',
		fontSize: '16px',
		fontWeight: 600,
		color: '#000',
		borderBottom: '1px solid rgba(216, 164, 65, 0.4)',
		'&:before, &:after': {
			display: 'none',
		},
	},
	'& .MuiInputBase-input': {
		padding: '4px 0',
	},
}));

const EntryTextArea = styled(TextField)(({ theme, compact }) => ({
	'& .MuiInputBase-root': {
		fontFamily: '"Manrope", sans-serif',
		fontSize: '14px',
		color: '#333',
		'&:before, &:after': {
			display: 'none',
		},
		height: compact ? 'auto' : '100%',
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
	flex: compact ? 'none' : 1,
	display: 'flex',
}));

const SaveButtonWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
}));

const SaveButton = styled(Button)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	padding: '8px 16px',
	backgroundColor: '#FACD69',
	borderRadius: '12px',
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: 500,
	textTransform: 'none',
	color: '#000',
	fontFamily: '"Manrope", sans-serif',
	'&:hover': {
		backgroundColor: HOVER_COLOR,
		opacity: 0.9,
	},
}));

export default function JournalForm({ compact = false }) {
	const navigate = useNavigate();

	const [entryText, setEntryText] = useState('');
	const [entryTitle, setEntryTitle] = useState('');
	const [selectedFeeling, setSelectedFeeling] = useState(null);
	const [selectedTags, setSelectedTags] = useState([]);

	// Emojis
	const emojis = ['😊', '😂', '🙂', '😡', '😐', '😩'];
	const tags = ['Reflection', 'Gratitude', 'Daily Intention', 'Release'];

	// Plantillas para cada tipo de entrada
	const templates = {
		Reflection: "Today I'm reflecting on...\n\nWhat went well:\n\nWhat could have gone better:\n\nWhat I learned:",
		Gratitude: "Today I'm grateful for:\n\n1.\n2.\n3.\n\nWhy these matter to me:",
		'Daily Intention': 'My intention for today is:\n\nHow I plan to achieve this:\n\nHow I will measure success:',
		Release: "What I need to let go of:\n\nWhy I'm holding onto it:\n\nHow I will release it:",
	};

	const handleTagClick = (tag) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
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
		navigate(compact ? '/journal/write' : '/journal');
	};

	return (
		<JournalContainer compact={compact}>
			<HeaderSection>
				<TitleGroup>
					<IconCircle>
						<SentimentSatisfiedOutlinedIcon sx={{ color: '#000', fontSize: 18 }} />
					</IconCircle>
					<Typography sx={{ fontSize: 16, fontWeight: 600 }}>Write what you feel</Typography>
				</TitleGroup>
				<IconButton onClick={toggleExpand} size='small'>
					{compact ? (
						<OpenInFullOutlinedIcon sx={{ color: '#000', fontSize: 18 }} />
					) : (
						<CloseFullscreenIcon sx={{ color: '#000', fontSize: 18 }} />
					)}
				</IconButton>
			</HeaderSection>

			<FeelingsSection>
				<FeelingsLabel>How do you feel today?</FeelingsLabel>
				<EmojiWrapper>
					{emojis.map((emoji, index) => (
						<EmojiButton key={index} selected={selectedFeeling === emoji} onClick={() => setSelectedFeeling(emoji)}>
							{emoji}
						</EmojiButton>
					))}
				</EmojiWrapper>
			</FeelingsSection>

			<TagWrapper>
				{tags.map((tag, index) => (
					<TagButton key={index} selected={selectedTags.includes(tag)} onClick={() => handleTagClick(tag)}>
						{tag}
					</TagButton>
				))}
			</TagWrapper>

			<EntrySection compact={compact}>
				<EntryTitle
					fullWidth
					variant='standard'
					placeholder='Title'
					value={entryTitle}
					onChange={(e) => setEntryTitle(e.target.value)}
					InputProps={{ disableUnderline: true }}
				/>
				<EntryTextArea
					fullWidth
					multiline
					placeholder='Write here...'
					minRows={compact ? 4 : 8}
					value={entryText}
					onChange={(e) => setEntryText(e.target.value)}
					variant='outlined'
					compact={compact}
				/>
			</EntrySection>

			<SaveButtonWrapper>
				<SaveButton>
					<IconCircle bgcolor='#f6d776'>
						{compact ? (
							<TurnedInNotOutlinedIcon sx={{ color: '#000', fontSize: 16 }} />
						) : (
							<SendIcon sx={{ color: '#000', fontSize: 16 }} />
						)}
					</IconCircle>
					<span>Save</span>
				</SaveButton>
			</SaveButtonWrapper>
		</JournalContainer>
	);
}
