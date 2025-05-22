import { Box, Typography } from '@mui/material';
const JournalCards = ({ journalData }) => {
	if (journalData.length === 0) {
		return (
			<Typography
				sx={{
					fontFamily: "'Manrope', sans-serif",
					fontSize: '1rem',
					fontWeight: 400,
					color: '#666',
					textAlign: 'center',
					marginTop: '2rem',
				}}
			>
				No journal entries available yet.
			</Typography>
		);
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			{journalData.map((week) => (
				<Box key={week.week} sx={{ marginBottom: '1.5rem' }}>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '2rem',
							fontWeight: 700,
							color: '#333',
							marginBottom: '1rem',
						}}
					>
						Week {week.week}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem',
							justifyContent: 'flex-start',
						}}
					>
						{week.entries.map((entry, index) => (
							<Box
								key={index}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									width: {
										xs: '100%',
										sm: 'calc(50% - 0.5rem)',
										md: 'calc(33.33% - 0.67rem)',
										lg: 'calc(25% - 0.75rem)',
									},
									height: '0',
									paddingBottom: {
										xs: '100%',
										sm: 'calc(50% - 0.5rem)',
										md: 'calc(33.33% - 0.67rem)',
										lg: 'calc(25% - 0.75rem)',
									},
									position: 'relative',
									borderRadius: '1rem',
									background: entry.color || '#FDE3A7',
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										padding: '1.5rem',
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<Typography
										sx={{
											fontFamily: "'Manrope', sans-serif",
											fontSize: {
												xs: '1.5rem',
												sm: '1.75rem',
											},
											fontWeight: 700,
											color: '#33356B',
											marginBottom: '1rem',
										}}
									>
										{entry.day || 'Unknown Day'}
									</Typography>

									<Typography
										sx={{
											fontFamily: "'Manrope', sans-serif",
											fontSize: '1rem',
											fontWeight: 400,
											color: '#33356B',
											lineHeight: 1.5,
											overflow: 'auto',
										}}
									>
										{entry.description || 'No content available.'}
									</Typography>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default JournalCards;
