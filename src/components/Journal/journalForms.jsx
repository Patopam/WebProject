import React, { useState } from 'react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function JournalForm({ compact = false }) {
	const navigate = useNavigate();

	const [entryText, setEntryText] = useState('');
	const [entryTitle, setEntryTitle] = useState('');
	const [selectedFeeling, setSelectedFeeling] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	const emojis = ['😊', '😭', '😡', '😢', '😑', '😩'];
	const tags = ['Reflection', 'Gratitude', 'Daily Intention', 'Release'];

	const handleTagClick = (tag) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	return (
		<div className={`journal-form-container ${compact ? 'compact' : 'expanded'}`}>
			<section className='header-section'>
				<div className='title-group'>
					<Box className='icon-circle'>
						<SentimentSatisfiedOutlinedIcon className='main-icon' />
					</Box>
					<span className='section-title'>Write what you feel</span>
				</div>
				<OpenInFullOutlinedIcon
					className='expand-icon'
					onClick={() => navigate(compact ? '/journal/write' : '/journal')}
				/>
			</section>

			<section className='feelings-section'>
				<h3>How do you feel today?</h3>
				<div className='emoji-wrapper'>
					{emojis.map((emoji, index) => (
						<span
							key={index}
							className={`emoji ${selectedFeeling === emoji ? 'selected' : ''}`}
							onClick={() => setSelectedFeeling(emoji)}
						>
							{emoji}
						</span>
					))}
				</div>
			</section>

			<div className='tag-wrapper'>
				{tags.map((tag, index) => (
					<button
						key={index}
						className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
						onClick={() => handleTagClick(tag)}
					>
						{tag}
					</button>
				))}
			</div>

			<section className='entry-section'>
				<input
					type='text'
					placeholder='Title'
					className='entry-title'
					value={entryTitle}
					onChange={(e) => setEntryTitle(e.target.value)}
				/>
				<textarea
					placeholder='Write here...'
					value={entryText}
					onChange={(e) => setEntryText(e.target.value)}
				></textarea>
			</section>

			<div className='save-button-wrapper'>
				<button className='save-button' onClick={() => alert('Saved!')}>
					<Box className='icon-circle'>
						<TurnedInNotOutlinedIcon className='main-icon' />
					</Box>
					<span>Save</span>
				</button>
			</div>
		</div>
	);
}
