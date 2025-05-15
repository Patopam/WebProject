import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import PeriodFilter from '../Filters/PeriodFilter';
import { LabelList } from 'recharts';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const emotionMap = {
	happy: { emoji: '😄', value: 5 },
	sad: { emoji: '😭', value: 1 },
	nostalgic: { emoji: '😢', value: 2 },
	angry: { emoji: '😡', value: 0 },
	neutral: { emoji: '😑', value: 3 },
	stressed: { emoji: '😩', value: 4 },
};

export default function EmotionChart() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const uid = useSelector((state) => state.userId.id);

	const [allJournals, setAllJournals] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [period, setPeriod] = useState('week');
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		const fetchData = async () => {
			if (!uid) return;

			const journalsRef = collection(db, 'users', uid, 'journals');
			const querySnapshot = await getDocs(journalsRef);

			const data = [];
			querySnapshot.forEach((doc) => {
				const d = doc.data();
				if (d.date && d.emotion) {
					const date = d.date.toDate();
					data.push({ date, emotion: d.emotion });
				}
			});
			setAllJournals(data);
		};
		fetchData();
	}, [uid]);

	useEffect(() => {
		let filtered = [];

		if (period === 'week') {
			const referenceDate = new Date(selectedDate);
			const day = referenceDate.getDay();
			const monday = new Date(referenceDate);
			monday.setDate(referenceDate.getDate() - ((day + 6) % 7));
			const sunday = new Date(monday);
			sunday.setDate(monday.getDate() + 6);

			filtered = allJournals
				.filter((j) => {
					const journalDate = new Date(j.date);
					journalDate.setHours(0, 0, 0, 0);
					return journalDate >= monday && journalDate <= sunday;
				})
				.map((j) => ({
					day: j.date.toLocaleDateString('en-US', { weekday: 'long' }),
					emotion: emotionMap[j.emotion]?.emoji,
					emotionValue: emotionMap[j.emotion]?.value,
				}));
		} else if (period === 'month') {
			const month = selectedDate.getMonth();
			const year = selectedDate.getFullYear();
			const grouped = {};

			allJournals.forEach((j) => {
				const d = j.date;
				if (d.getMonth() === month && d.getFullYear() === year) {
					const emo = j.emotion;
					grouped[emo] = (grouped[emo] || 0) + 1;
				}
			});

			filtered = Object.entries(grouped).map(([emotion, count]) => ({
				emotion: emotionMap[emotion]?.emoji,
				count,
			}));
		} else if (period === 'year') {
			const year = selectedDate.getFullYear();
			const grouped = {};

			allJournals.forEach((j) => {
				const d = j.date;
				if (d.getFullYear() === year) {
					const month = d.getMonth();
					const emo = j.emotion;
					if (!grouped[month]) grouped[month] = {};
					grouped[month][emo] = (grouped[month][emo] || 0) + 1;
				}
			});

			filtered = Object.entries(grouped).map(([monthIndex, emotionCounts]) => {
				const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0][0];
				return {
					month: new Date(2025, parseInt(monthIndex)).toLocaleString('default', { month: 'short' }),
					emotion: emotionMap[topEmotion]?.emoji,
					emotionValue: emotionMap[topEmotion]?.value,
				};
			});
		}

		setFilteredData(filtered);
	}, [period, selectedDate, allJournals]);

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
				background: '#E3E9CF',
				borderRadius: '1rem',
				p: { xs: 2, sm: 3 },
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
			}}
		>
			<Typography variant='h4' sx={styleText.Titulo}>
				My emotions
			</Typography>

			<PeriodFilter
				period={period}
				onPeriodChange={setPeriod}
				selectedDate={selectedDate}
				onDateChange={setSelectedDate}
				availableMonths={[
					'Enero',
					'Febrero',
					'Marzo',
					'Abril',
					'Mayo',
					'Junio',
					'Julio',
					'Agosto',
					'Septiembre',
					'Octubre',
					'Noviembre',
					'Diciembre',
				]}
				availableYears={[2023, 2024, 2025]}
			/>

			<Box
				sx={{
					width: '100%',
					height:
						period === 'week'
							? isMobile
								? 400
								: 500
							: period === 'month'
							? isMobile
								? 500
								: 600
							: isMobile
							? 550
							: 650,
				}}
			>
				<ResponsiveContainer width='100%' height='100%'>
					{period === 'week' && (
						<LineChart data={filteredData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='day' />
							<YAxis domain={[0, 5]} />
							<Tooltip />
							<Line dataKey='emotionValue' stroke='#49499D' />
						</LineChart>
					)}

					{period === 'month' && (
						<BarChart data={filteredData} barCategoryGap='30%'>
							<XAxis dataKey='emotion' />
							<YAxis />
							<Tooltip formatter={(value) => [`${value}`, 'Conteo']} labelFormatter={(label) => `Emoción: ${label}`} />
							<Bar dataKey='count' fill='#7C77B9'>
								<LabelList dataKey='emotion' position='top' />
							</Bar>
						</BarChart>
					)}

					{period === 'year' && (
						<BarChart data={filteredData} barCategoryGap='30%'>
							<XAxis dataKey='month' />
							<YAxis />
							<Tooltip
								formatter={(value) => [`${value}`, 'Intensidad']}
								labelFormatter={(label, payload) => {
									const emotion = payload?.[0]?.payload?.emotion || '';
									return `Mes: ${label} | Emoción: ${emotion}`;
								}}
							/>
							<Bar dataKey='emotionValue' fill='#49499D'>
								<LabelList dataKey='emotion' position='top' />
							</Bar>
						</BarChart>
					)}
				</ResponsiveContainer>
			</Box>
		</Box>
	);
}
