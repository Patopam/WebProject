import React, { useState } from 'react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import AddButton from '../../components/Buttons/add';

export default function ExpandedJournal() {
	// aquí pongo el estado para los textos que se escriben
	const [entryText, setEntryText] = useState('');
	const [selectedFeeling, setSelectedFeeling] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	// aquí estoy guardando los emojis
	const emojis = ['😊', '😣', '😠', '😢', '😊', '😠', '😊'];

	// aquí van las categorías tipo chips
	const tags = ['Reflection', 'Gratitude', 'Daily Intention', 'Release'];

	const handleTagClick = (tag) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	return (
		<div className='expanded-journal-container'>
			<div className='header'>
				<div className='title'>
					<SentimentSatisfiedOutlinedIcon className='icon' />
					<span>Write what you feel</span>
				</div>
				<OpenInFullOutlinedIcon className='expand-icon' />
			</div>

			<h3>How do you feel today?</h3>
			<div className='emoji-row'>
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

			<div className='tags'>
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

			<div className='text-area'>
				<label>Title</label>
				<textarea
					placeholder='Write here...'
					value={entryText}
					onChange={(e) => setEntryText(e.target.value)}
				></textarea>
			</div>

			<AddButton
				text='Save'
				icon={<TurnedInNotOutlinedIcon sx={{ fontSize: '24px', color: '#000000' }} />}
				onClick={() => alert('Saved!')}
			/>
		</div>
	);
}
