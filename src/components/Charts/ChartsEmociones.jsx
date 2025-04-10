import React from 'react';
import { Typography, Container, Stack, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EmotionsLineChartCentered() {
	const styleText = {
		Linea: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '16px',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: 'normal',
			color: '#000000',
			marginTop: '20px',
			textAlign: 'center',
		},
		Titulo: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontWeight: 400,
			color: '#000000',
			marginTop: '20px',
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
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={-10} y={0} dy={4} textAnchor='end' fill='#666' fontSize='16px'>
					{emotions[payload.value]}
				</text>
			</g>
		);
	};

	// Puntos personalizados con emojis centrados en la línea
	const CustomizedDot = (props) => {
		const { cx, cy, payload } = props;

		return (
			<g>
				{/* Círculo blanco detrás del emoji para que se vea mejor */}
				<circle cx={cx} cy={cy} r={12} fill='white' stroke='#49499D' strokeWidth={1} />
				<text x={cx} y={cy} dy={5} dx={0} textAnchor='middle' fontSize='16px'>
					{payload.emotion}
				</text>
			</g>
		);
	};

	// Personalización del tooltip
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className='bg-white p-2 border rounded shadow'>
					<p className='text-sm'>{`${payload[0].payload.day}: ${payload[0].payload.emotion}`}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className=''>
			<Typography variant='h4' sx={styleText.Titulo}>
				My Emotions of the Week
			</Typography>
			<ResponsiveContainer width='100%' height={250}>
				<LineChart
					width={50}
					height={300}
					data={emotionsData}
					margin={{ top: 20, right: 40, left: 30, bottom: 5 }}
					style={styleText.Linea}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='day' />
					<YAxis domain={[0, emotions.length - 1]} ticks={emotions.map((_, i) => i)} tick={<CustomYAxisTick />} />
					<Tooltip content={<CustomTooltip />} />
					<Legend />
					<Line
						type='monotone'
						dataKey='emotionValue'
						name='Emoción'
						stroke='#49499D'
						strokeWidth={4}
						dot={<CustomizedDot />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
