import React from 'react';
import { SentimentSatisfiedAlt } from '@mui/icons-material';

const EmotionWeek = ({ compact = false }) => {
	// Eliminamos el estado de doble fila ya que siempre queremos una sola fila
	// Mantenemos el efecto para ajustes responsivos de tamaño de componentes
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	React.useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Ejecución inicial
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const containerStyle = {
		display: 'flex',
		width: '100%',
		maxWidth: compact ? '26.75rem' : '40rem', // Equivalente a 428px y 544px
		height: 'auto', // Cambiado a auto para mejor responsividad
		padding: compact ? '1.75rem 1.75rem 3.3rem 1.75rem' : '1.75rem 1.75rem 4.2rem 1.75rem',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: compact ? '2.46rem' : '3.13rem',
		borderRadius: '1.5rem',
		background: '#E3E9CF',
		boxSizing: 'border-box',
		overflow: 'hidden', // Evita barras de desplazamiento
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

	// Mantenemos solo el estilo de una fila
	const dayRowStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		gap: '0.5rem', // Espacio entre columnas
	};

	// Función para calcular el ancho del día basado en el ancho de la ventana
	const getDayWidth = () => {
		// Base width para cada columna
		let baseWidth = compact ? 2.6 : 3.3; // en rem

		// Si la pantalla es pequeña, ajustamos el tamaño proporcionalmente
		if (windowWidth <= 425) {
			return `${baseWidth * 0.7}rem`;
		} else if (windowWidth <= 768) {
			return `${baseWidth * 0.85}rem`;
		}

		return `${baseWidth}rem`;
	};

	// Calculamos el padding basado en el ancho de la ventana
	const getDayPadding = () => {
		if (windowWidth <= 425) {
			return compact ? '0.75rem 0.25rem' : '0.8rem 0.3rem';
		} else if (windowWidth <= 768) {
			return compact ? '1rem 0.4rem' : '1.2rem 0.45rem';
		}

		return compact ? '1.25rem 0.625rem' : '1.6rem 0.5rem';
	};

	const dayColumnStyle = {
		flex: '0 0 auto', // Cambiamos a flex-shrink: 0 para evitar que se encoja
		width: getDayWidth(),
		minWidth: 'auto', // Quitamos el minWidth para mejor control
		height: 'auto', // Altura automática
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: getDayPadding(),
		borderRadius: '1.875rem',
		backgroundColor: '#C8D39F',
		boxSizing: 'border-box',
		textAlign: 'center', // Centrar el texto
	};

	// Ajustar tamaños de fuente según el ancho de la ventana
	const getFontSize = (baseSize) => {
		if (windowWidth <= 425) {
			return `${baseSize * 0.75}rem`;
		} else if (windowWidth <= 768) {
			return `${baseSize * 0.9}rem`;
		}
		return `${baseSize}rem`;
	};

	const dayTextStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: getFontSize(1), // Ajustable según tamaño de pantalla
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
		marginBottom: '0.5rem',
	};

	const dayNumberStyle = {
		fontFamily: "'Manrope', sans-serif",
		fontSize: getFontSize(1.25), // Ajustable según tamaño de pantalla
		fontWeight: 500,
		color: '#333',
		lineHeight: '110%',
		fontStyle: 'normal',
		margin: '0.5rem 0',
	};

	const emojiStyle = {
		fontSize:
			windowWidth <= 425
				? '1.25rem'
				: windowWidth <= 768
				? compact
					? '1.3rem'
					: '1.75rem'
				: compact
				? '1.5rem'
				: '2rem',
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
					<SentimentSatisfiedAlt style={{ fontSize: '1.4rem', color: '#333' }} />
				</div>
				<h2 style={titleStyle}>Emotion week</h2>
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
