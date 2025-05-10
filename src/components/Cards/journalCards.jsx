import React from 'react';
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
				}}
			>
				No hay entradas para este mes.
			</Typography>
		);
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			{' '}
			{/* 32px a 2rem */}
			{journalData.map((week) => (
				<Box key={week.week} sx={{ marginBottom: '1.5rem' }}>
					{' '}
					{/* 24px a 1.5rem */}
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '2rem', // 32px a 2rem
							fontWeight: 700,
							color: '#333',
							marginBottom: '1rem', // 16px a 1rem
						}}
					>
						Week {week.week}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '1rem', // 16px a 1rem
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
										xs: '100%', // En pantallas muy pequeñas, ocupará el 100%
										sm: 'calc(50% - 0.5rem)', // En pantallas pequeñas, 2 tarjetas por fila
										md: 'calc(33.33% - 0.67rem)', // En pantallas medianas, 3 tarjetas por fila
										lg: 'calc(25% - 0.75rem)', // En pantallas grandes, 4 tarjetas por fila
									},
									height: '0',
									paddingBottom: {
										xs: '100%',
										sm: 'calc(50% - 0.5rem)', // Proporción en pequeñas pantallas
										md: 'calc(33.33% - 0.67rem)', // Proporción en medianas pantallas
										lg: 'calc(25% - 0.75rem)', // Proporción en grandes pantallas
									},
									position: 'relative',
									borderRadius: '1rem', // 16px a 1rem
									background: entry.color,
									overflow: 'hidden', // Para mantener el contenido dentro de los bordes redondeados
								}}
							>
								<Box
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										padding: '1.5rem', // 24px a 1.5rem
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
											marginBottom: '1rem', // 16px a 1rem
										}}
									>
										{entry.day}
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
										{entry.content}
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
