import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, styled } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import { useNavigate } from 'react-router-dom';

// Color de hover unificado
const HOVER_COLOR = '#fcd48f';

// Styled components
const JournalContainer = styled(Box)(({ theme }) => ({
	backgroundColor: '#fde3a7',
	padding: '40px',
	fontFamily: '"Manrope", sans-serif',
	borderRadius: '16px',
	width: '800px',
	margin: '0 auto',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '24px',
}));

const TitleGroup = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '12px',
}));

const IconCircle = styled(Box)(({ bgcolor = '#FACD69' }) => ({
	backgroundColor: bgcolor,
	width: '37px',
	height: '37px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const FeelingsSection = styled(Box)(({ theme }) => ({
	marginBottom: '20px',
}));

const EmojiWrapper = styled(Box)(({ theme }) => ({
	display: 'inline-flex',
	gap: '12px',
	backgroundColor: '#FACD69',
	padding: '12px 16px',
	borderRadius: '12px',
	marginBottom: '20px',
}));

const EmojiButton = styled(Box)(({ selected }) => ({
	fontSize: '24px',
	cursor: 'pointer',
	transition: 'transform 0.2s ease',
	transform: selected ? 'scale(1.3)' : 'scale(1)',
}));

const TagWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '12px',
	marginBottom: '24px',
	flexWrap: 'wrap',
}));

const TagButton = styled(Button)(({ selected }) => ({
	backgroundColor: selected ? '#F69F77' : '#FACD69',
	borderRadius: '16px',
	padding: '8px 16px',
	textTransform: 'none',
	fontWeight: 500,
	fontSize: '14px',
	color: '#000',
	'&:hover': {
		backgroundColor: HOVER_COLOR,
		opacity: 0.9,
	},
}));

const EntrySection = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
	backgroundColor: '#fde3a7',
	border: '2px solid #f6d776',
	borderRadius: '16px',
	padding: '20px',
	marginBottom: '32px',
}));

const EntryTitle = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-root': {
		fontFamily: '"Manrope", sans-serif',
		fontSize: '18px',
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

const EntryTextArea = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-root': {
		fontFamily: '"Manrope", sans-serif',
		fontSize: '16px',
		color: '#333',
		'&:before, &:after': {
			display: 'none',
		},
	},
	'& .MuiOutlinedInput-notchedOutline': {
		border: 'none',
	},
}));

const SaveButtonWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
}));

const SaveButton = styled(Button)(({ theme }) => ({
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
}));

export default function JournalForm() {
	const navigate = useNavigate();

	const [entryText, setEntryText] = useState('');
	const [entryTitle, setEntryTitle] = useState('');
	const [selectedFeeling, setSelectedFeeling] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	// Emojis exactamente como en la imagen
	const emojis = ['😄', '😭', '😢', '😡', '😑', '😩'];
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

	return (
		<JournalContainer>
			<HeaderSection>
				<TitleGroup>
					<IconCircle>
						<SentimentSatisfiedOutlinedIcon sx={{ color: '#000', fontSize: 20 }} />
					</IconCircle>
					<Typography sx={{ fontSize: 18, fontWeight: 600 }}>Write what you feel</Typography>
				</TitleGroup>
				<IconButton onClick={() => navigate('/journal/write')}>
					<OpenInFullOutlinedIcon sx={{ color: '#000' }} />
				</IconButton>
			</HeaderSection>

			<FeelingsSection>
				<Typography variant='h3' sx={{ fontSize: 16, marginBottom: '12px', fontWeight: 600 }}>
					How do you feel today?
				</Typography>
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

			<EntrySection>
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
					minRows={5}
					value={entryText}
					onChange={(e) => setEntryText(e.target.value)}
					variant='outlined'
				/>
			</EntrySection>

			<SaveButtonWrapper>
				<SaveButton>
					<IconCircle bgcolor='#f6d776'>
						<TurnedInNotOutlinedIcon sx={{ color: '#000', fontSize: 20 }} />
					</IconCircle>
					<span>Save</span>
				</SaveButton>
			</SaveButtonWrapper>
		</JournalContainer>
	);
}
