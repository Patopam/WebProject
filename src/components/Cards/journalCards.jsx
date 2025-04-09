import React from 'react';
import { Box, Typography } from '@mui/material';

const JournalCards = ({ journalData }) => {
	if (journalData.length === 0) {
		return (
			<Typography
				sx={{
					fontFamily: "'Manrope', sans-serif",
					fontSize: '16px',
					fontWeight: 400,
					color: '#666',
				}}
			>
				No hay entradas para este mes.
			</Typography>
		);
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
			{journalData.map((week) => (
				<Box key={week.week} sx={{ marginBottom: '24px' }}>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '32px',
							fontWeight: 700,
							color: '#333',
							marginBottom: '16px',
						}}
					>
						Week {week.week}
					</Typography>

					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
						{week.entries.map((entry, index) => (
							<Box
								key={index}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									width: '400px',
									height: '400px',
									padding: '24px',
									borderRadius: '16px',
									background: entry.color,
								}}
							>
								<Typography
									sx={{
										fontFamily: "'Manrope', sans-serif",
										fontSize: '28px',
										fontWeight: 700,
										color: '#33356B',
										marginBottom: '16px',
									}}
								>
									{entry.day}
								</Typography>

								<Typography
									sx={{
										fontFamily: "'Manrope', sans-serif",
										fontSize: '16px',
										fontWeight: 400,
										color: '#33356B',
										lineHeight: '150%',
									}}
								>
									{entry.content}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default JournalCards;
