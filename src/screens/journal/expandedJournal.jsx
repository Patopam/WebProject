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
	const emojis = ['😊', '😭', '😡', '😢', '😑', '😩'];

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

			{/* ESTILOS */}
			<style jsx>{`
				.expanded-journal-container {
					background-color: #fde3a7;
					padding: 40px;
					width: 100%;
					max-width: 1000px;
					margin: 0 auto;
					font-family: 'Manrope', sans-serif;
				}

				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24px;
				}

				.title {
					display: flex;
					align-items: center;
					font-size: 20px;
					font-weight: 600;
					gap: 10px;
				}

				.icon,
				.expand-icon {
					color: #000;
					cursor: pointer;
				}

				h3 {
					margin-bottom: 12px;
					font-size: 18px;
				}

				.emoji-row {
					display: flex;
					gap: 12px;
					margin-bottom: 20px;
				}

				.emoji {
					font-size: 28px;
					cursor: pointer;
					transition: transform 0.2s ease;
				}

				.emoji.selected {
					transform: scale(1.3);
				}

				.tags {
					display: flex;
					gap: 12px;
					flex-wrap: wrap;
					margin-bottom: 24px;
				}

				.tag {
					background-color: #f6d776;
					border: none;
					padding: 8px 16px;
					border-radius: 12px;
					cursor: pointer;
					font-weight: 500;
				}

				.tag.selected {
					background-color: #e8c255;
				}

				.text-area {
					display: flex;
					flex-direction: column;
					gap: 8px;
				}

				.text-area textarea {
					min-height: 160px;
					border-radius: 12px;
					border: 1px solid #d4a545;
					padding: 12px;
					font-family: 'Manrope', sans-serif;
					resize: none;
					font-size: 16px;
					background-color: #fde3a7;
				}

				.save-button {
					margin-top: 24px;
					display: flex;
					justify-content: flex-end;
				}
			`}</style>
		</div>
	);
}
