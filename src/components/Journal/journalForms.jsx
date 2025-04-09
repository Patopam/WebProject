import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import Box from '@mui/material/Box';

export default function JournalForm({ compact = false }) {
	const emojis = ['😊', '😭', '😡', '😢', '😑', '😩'];
	const tags = ['Reflection', 'Gratitude', 'Daily Intention', 'Release'];

	return (
		<div className={`journal-form-container ${compact ? 'compact' : 'expanded'}`}>
			<section className='header-section'>
				<div className='title-group'>
					<Box className='icon-circle'>
						<SentimentSatisfiedOutlinedIcon className='main-icon' />
					</Box>
					<span className='section-title'>Write what you feel</span>
				</div>
				<OpenInFullOutlinedIcon className='expand-icon' />
			</section>

			<section className='feelings-section'>
				<h3>How do you feel today?</h3>
				<div className='emoji-wrapper'>
					{emojis.map((emoji, index) => (
						<span key={index}>{emoji}</span>
					))}
				</div>
			</section>

			<div className='tag-wrapper'>
				{tags.map((tag, index) => (
					<button key={index}>{tag}</button>
				))}
			</div>

			<section className='entry-section'>
				<input type='text' placeholder='Title' className='entry-title' />
				<textarea placeholder='Write here...'></textarea>
			</section>

			<div className='save-button-wrapper'>
				<button className='save-button'>
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
				.expand-icon {
					color: #000;
					cursor: pointer;
				}

				.feelings-section h3 {
					font-size: 16px;
					margin-bottom: 12px;
				}

				.emoji-wrapper {
					display: inline-flex;
					gap: 12px;
					background-color: #fcd48f;
					padding: 12px 16px;
					border-radius: 12px;
					margin-bottom: 20px;
				}

				.emoji {
					font-size: 24px;
					cursor: pointer;
					transition: transform 0.2s ease;
				}

				.emoji.selected {
					transform: scale(1.3);
				}

				.tag-wrapper {
					display: flex;
					gap: 12px;
					margin-bottom: 24px;
					flex-wrap: wrap;
				}

				.tag {
					background-color: #f6d776;
					border: none;
					padding: 8px 16px;
					border-radius: 16px;
					font-weight: 500;
					cursor: pointer;
					font-size: 14px;
				}

				.tag.selected {
					background-color: #e8c255;
				}

				.entry-section {
					display: flex;
					flex-direction: column;
					gap: 16px;
					background-color: #fde3a7;
					border: 2px solid #f6d776;
					border-radius: 16px;
					padding: 20px;
					margin-bottom: 32px;
				}

				.entry-title {
					font-size: 18px;
					border: none;
					border-bottom: 1px solid rgba(216, 164, 65, 0.4);
					background: transparent;
					padding: 4px 0;
					font-weight: 600;
					color: #000;
					outline: none;
				}

				.entry-section textarea {
					background-color: transparent;
					border: none;
					outline: none;
					resize: none;
					font-size: 16px;
					font-family: 'Manrope', sans-serif;
					color: #333;
					min-height: 120px;
				}

				.save-button-wrapper {
					display: flex;
					justify-content: center;
				}

				.save-button {
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 12px 20px;
					background-color: #fcd48f;
					border: none;
					border-radius: 12px;
					cursor: pointer;
					font-size: 16px;
					font-weight: 500;
					font-family: 'Manrope', sans-serif;
				}

				.save-button .icon-circle {
					background-color: #f6d776;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			`}</style>
		</div>
	);
}
