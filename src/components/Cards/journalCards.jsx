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
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '1.5rem',
				justifyContent: 'flex-start',
			}}
		>
			{journalData.map((entry) => {
				const formattedDate = entry.date.toDateString();
				return (
					<Box
						key={entry.id}
						sx={{
							width: {
								xs: '100%',
								sm: 'calc(50% - 0.75rem)',
								md: 'calc(33.33% - 1rem)',
								lg: 'calc(25% - 1.25rem)',
							},
							padding: '1rem',
							borderRadius: '1rem',
							background: '#F5F5F5',
							boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
							display: 'flex',
							flexDirection: 'column',
							gap: '0.5rem',
						}}
					>
						<Typography
							sx={{
								fontSize: '0.8rem',
								color: '#777',
								fontFamily: "'Manrope', sans-serif",
							}}
						>
							{formattedDate}
						</Typography>
						<Typography
							sx={{
								fontSize: '1.1rem',
								fontWeight: 600,
								color: '#33356B',
								fontFamily: "'Manrope', sans-serif",
							}}
						>
							{entry.title || 'Untitled'}
						</Typography>
						<Typography
							sx={{
								fontSize: '0.95rem',
								color: '#333',
								fontFamily: "'Manrope', sans-serif",
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
							}}
						>
							{entry.description || 'No content available.'}
						</Typography>
					</Box>
				);
			})}
		</Box>
	);
};

export default JournalCards;
