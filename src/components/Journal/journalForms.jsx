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

			<style jsx>{`
				.journal-form-container {
					background-color: #fde3a7;
					padding: 40px;
					font-family: 'Manrope', sans-serif;
					border-radius: 16px;
				}

				.journal-form-container.compact {
					padding: 24px;
					max-width: 500px;
				}

				.journal-form-container.expanded {
					max-width: 1200px;
					margin: 0 auto;
				}

				.header-section {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24px;
				}

				.title-group {
					display: flex;
					align-items: center;
					gap: 12px;
				}

				.icon-circle {
					background-color: #f99f75;
					width: 37px;
					height: 37px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.main-icon {
					color: #000;
					font-size: 20px;
				}

				.section-title {
					font-size: 18px;
					font-weight: 600;
					color: #000;
				}
			`}</style>
		</div>
	);
}
