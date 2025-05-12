import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';

const emotions = ['😄', '😭', '😢', '😡', '😑', '😩'];

const emotionMap = {
	happy: { emoji: '😄', value: 5 },
	sad: { emoji: '😭', value: 1 },
	nostalgic: { emoji: '😢', value: 2 },
	angry: { emoji: '😡', value: 0 },
	neutral: { emoji: '😑', value: 3 },
	stressed: { emoji: '😩', value: 4 },
};

export default function ChartsEmociones() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const uid = useSelector((state) => state.userId.id);
	const [emotionsData, setEmotionsData] = useState([]);

	useEffect(() => {
		const fetchEmotions = async () => {
			if (!uid) {
				console.warn('❗ UID is not defined — skipping fetch');
				return;
			}

			try {
				console.log('🔍 Fetching emotions for UID:', uid);

				// ✅ Acceder directamente a la subcolección del usuario
				const journalsRef = collection(db, 'users', uid, 'journals');
				const querySnapshot = await getDocs(journalsRef);

				const rawData = [];

				querySnapshot.forEach((doc) => {
					const data = doc.data();
					if (data.date && data.emotion) {
						const date = data.date.toDate();
						const day = date.toLocaleDateString('en-US', {
							weekday: 'long',
							timeZone: 'America/Bogota',
						});
						const mapped = emotionMap[data.emotion];
						if (mapped) {
							rawData.push({
								day,
								emotion: mapped.emoji,
								emotionValue: mapped.value,
							});
						}
					}
				});

				console.log('✅ Emotions data:', rawData);
				setEmotionsData(rawData);
			} catch (error) {
				console.error('🔥 Error fetching emotions data:', error);
			}
		};

		fetchEmotions();
	}, [uid]);

	const CustomYAxisTick = ({ x, y, payload }) => {
		const fontSize = isMobile ? '0.875rem' : '1rem';
		return (
			<g transform={`translate(${x},${y})`}>
				<text x={-10} y={0} dy={4} textAnchor='end' fill='#666' fontSize={fontSize}>
					{emotions[payload.value]}
				</text>
			</g>
		);
	};

	const CustomizedDot = ({ cx, cy, payload }) => {
		const circleRadius = isMobile ? 12 : 16;
		const fontSize = isMobile ? '0.875rem' : '1rem';
		return (
			<g>
				<circle cx={cx} cy={cy} r={circleRadius} fill='white' stroke='#49499D' strokeWidth={2} />
				<text x={cx} y={cy} dy={5} textAnchor='middle' fontSize={fontSize}>
					{payload.emotion}
				</text>
			</g>
		);
	};

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

	const styleText = {
		Titulo: {
			fontFamily: 'Manrope, sans-serif',
			fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
			fontWeight: 400,
			color: '#000',
			textAlign: 'center',
			margin: '1.25rem 0',
		},
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
			<ResponsiveContainer width='100%' height={isMobile ? 220 : 320} style={{ marginBottom: '2rem' }}>
				<LineChart data={emotionsData} margin={{ top: 20, right: 40, left: 30, bottom: 30 }}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='day'
						fontSize={isMobile ? '0.75rem' : '0.875rem'}
						tick={{ fill: '#000' }}
						tickMargin={15}
						height={40}
					/>
					<YAxis
						domain={[0, emotions.length - 1]}
						ticks={emotions.map((_, i) => i)}
						tick={<CustomYAxisTick />}
						width={isMobile ? 25 : 40}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend />
					<Line
						type='monotone'
						dataKey='emotionValue'
						name='Emotion'
						stroke='#49499D'
						strokeWidth={isMobile ? 3 : 4}
						dot={<CustomizedDot />}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Box>
	);
}
