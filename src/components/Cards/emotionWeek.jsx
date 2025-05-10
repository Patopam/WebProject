import React from 'react';
import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false }) => {
	// Usamos rem para la mayoría de las medidas para mejor escalabilidad
	const containerStyle = {
		display: 'flex',
		width: compact ? '100%' : '100%', // Ancho relativo al contenedor padre
		maxWidth: compact ? '26.75rem' : '34rem', // Equivalente a 428px y 544px
		height: 'auto', // Altura automática basada en el contenido
		padding: compact ? '1.75rem 1.75rem 3.3rem 1.75rem' : '1.75rem 1.75rem 4.2rem 1.75rem',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: compact ? '2.46rem' : '3.13rem',
		borderRadius: '1.5rem',
		background: '#E3E9CF',
		boxSizing: 'border-box',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		width: '100%',
	};

	const iconContainerStyle = {
		width: '2.31rem', // 37px
		height: '2.31rem', // 37px
		borderRadius: '50%',
		backgroundColor: '#C8D39F',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	};

	const titleStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '1.125rem', // 18px
		fontWeight: 300,
		color: '#333',
		lineHeight: 'normal',
		fontStyle: 'normal',
	};

	const dayRowStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	};

	const dayColumnStyle = {
		width: compact ? '13%' : '13%', // Porcentaje del contenedor padre
		minWidth: compact ? '2.6rem' : '3.3rem', // Mínimo equivalente a 41.7px y 53px
		height: 'auto', // Altura automática
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: compact ? '1.25rem 0.625rem' : '1.875rem 1.25rem',
		borderRadius: '1.875rem',
		backgroundColor: '#C8D39F',
		boxSizing: 'border-box',
		aspectRatio: compact ? '41.7/118.01' : '53/150', // Mantiene la proporción del diseño original
	};

	const dayTextStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '1rem', // 16px
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
		marginBottom: '0.5rem',
	};

	const dayNumberStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: '1.25rem', // 20px
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
		margin: '0.5rem 0',
	};

	const emojiStyle = {
		fontSize: compact ? '1.5rem' : '2rem', // 24px o 32px
		marginTop: '0.5rem',
	};

	const weekData = [
		{ day: 'Mon', emoji: '😊' },
		{ day: 'Tus', emoji: '😣' },
		{ day: 'Wed', emoji: '😠' },
		{ day: 'Thu', emoji: '😢' },
		{ day: 'Fri', emoji: '😊' },
		{ day: 'Sat', emoji: '😠' },
		{ day: 'Sun', emoji: '😊' },
	];

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={iconContainerStyle}>
					<SentimentSatisfiedAlt style={{ fontSize: '1.5rem', color: '#333' }} />
				</div>
				<div style={titleStyle}>Emotion week</div>
			</div>

			<div style={dayRowStyle}>
				{weekData.map((item, index) => (
					<div key={index} style={dayColumnStyle}>
						<div style={dayTextStyle}>{item.day}</div>
						<div style={dayNumberStyle}>25</div>
						<div style={emojiStyle}>{item.emoji}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmotionWeek;
