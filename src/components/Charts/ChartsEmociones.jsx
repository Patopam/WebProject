import React from 'react';
import { Typography, Container, Stack, Box, useMediaQuery, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EmotionsLineChartCentered() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const styleText = {
		Linea: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '1rem', // 16px convertido a rem
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: 'normal',
			color: '#000000',
			marginTop: '1.25rem', // 20px a rem
			textAlign: 'center',
		},
		Titulo: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: {
				xs: '1.5rem', // Más pequeño
				sm: '1.75rem', // Mediano en tablets
				md: '2rem', // Normal en escritorio
			},
			fontWeight: 400,
			color: '#000000',
			marginTop: '1.25rem', // 20px a rem
			marginBottom: '1rem',
			textAlign: 'center',
		},
	};

	const emotions = ['😢', '😰', '😠', '😩', '😐', '😄'];

	const emotionsData = [
		{ day: 'Lunes', emotion: '😐', emotionValue: 4 },
		{ day: 'Martes', emotion: '😠', emotionValue: 2 },
		{ day: 'Miércoles', emotion: '😄', emotionValue: 5 },
		{ day: 'Jueves', emotion: '😩', emotionValue: 3 },
		{ day: 'Viernes', emotion: '😄', emotionValue: 5 },
		{ day: 'Sábado', emotion: '😄', emotionValue: 5 },
		{ day: 'Domingo', emotion: '😐', emotionValue: 4 },
	];

	// Renderizado personalizado para el eje Y
	const CustomYAxisTick = (props) => {
		const { x, y, payload } = props;
		const fontSize = isMobile ? '0.875rem' : '1rem'; // 14px en móvil, 16px en desktop

		return (
			<g transform={`translate(${x},${y})`}>
				<text x={isMobile ? -5 : -10} y={0} dy={4} textAnchor='end' fill='#666' fontSize={fontSize}>
					{emotions[payload.value]}
				</text>
			</g>
		);
	};

	// Puntos personalizados con emojis centrados en la línea
	const CustomizedDot = (props) => {
		const { cx, cy, payload } = props;
		const circleRadius = isMobile ? 12 : 16;
		const fontSize = isMobile ? '0.875rem' : '1rem'; // 14px en móvil, 16px en desktop

		return (
			<g>
				{/* Círculo blanco detrás del emoji para que se vea mejor */}
				<circle
					cx={cx}
					cy={cy}
					r={circleRadius}
					fill='white'
					stroke='#49499D'
					strokeWidth={2}
				/>
				<text x={cx} y={cy} dy={5} dx={0} textAnchor='middle' fontSize={fontSize}>
					{payload.emotion}
				</text>
			</g>
		);
	};

	// Personalización del tooltip
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<Box
					sx={{
						backgroundColor: 'white',
						padding: '0.5rem',
						border: '1px solid #ccc',
						borderRadius: '0.25rem',
						boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
					}}
				>
					<Typography sx={{ fontSize: '0.875rem' }}>
						{`${payload[0].payload.day}: ${payload[0].payload.emotion}`}
					</Typography>
				</Box>
			);
		}
		return null;
	};

	// Determinar altura del gráfico basada en el tamaño de la pantalla
	const chartHeight = {
		xs: 220, // Altura en móviles (aumentada)
		sm: 280, // Altura en tablets (aumentada)
		md: 320, // Altura en desktop (aumentada)
	};


	return (
		<Box
			sx={{
				width: '100%',
				padding: { xs: '0.5rem', sm: '1rem', md: '1.5rem' },
				background: '#E3E9CF',
				borderRadius: '1rem',
			}}
		>
			<Typography variant='h4' sx={styleText.Titulo}>
				My Emotions of the Week
			</Typography>
			<ResponsiveContainer
				width='100%'
				height={
					theme.breakpoints.values.xs ? chartHeight.xs : theme.breakpoints.values.sm ? chartHeight.sm : chartHeight.md
				}
				style={{ marginBottom: '2rem' }}
			>
				<LineChart
					data={emotionsData}
					margin={{ top: 20, right: 40, left: 30, bottom: 30 }}
					style={styleText.Linea}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='day'
						fontSize={isMobile ? '0.75rem' : '0.875rem'}
						tick={{ fill: '#000' }}
						tickMargin={15}
						angle={0}
						textAnchor='middle'
						height={40}
					/>
					<YAxis
						domain={[0, emotions.length - 1]}
						ticks={emotions.map((_, i) => i)}
						tick={<CustomYAxisTick />}
						width={isMobile ? 25 : 40}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend
						wrapperStyle={{
							fontSize: isMobile ? '0.75rem' : '0.875rem',
							marginTop: '1rem',
							paddingTop: '0.5rem',
						}}
					/>
					<Line
						type='monotone'
						dataKey='emotionValue'
						name='Emoción'
						stroke='#49499D'
						strokeWidth={isMobile ? 3 : 4}
						dot={<CustomizedDot />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Box>
	);
}
