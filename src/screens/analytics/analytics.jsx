import React, { useEffect, useState } from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import PeriodFilter from '../Filters/PeriodFilter';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
} from 'recharts';

const emotionMap = {
	happy: { emoji: '😄', value: 5 },
	sad: { emoji: '😭', value: 1 },
	nostalgic: { emoji: '😢', value: 2 },
	angry: { emoji: '😡', value: 0 },
	neutral: { emoji: '😑', value: 3 },
	stressed: { emoji: '😩', value: 4 },
};

const emotionList = Object.keys(emotionMap);

export default function EmotionChart() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const uid = useSelector((state) => state.userId.id);

	const [allJournals, setAllJournals] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [period, setPeriod] = useState('week');
	const [selectedDate, setSelectedDate] = useState(new Date());

	// 1. Obtener datos de Firebase
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

	// 2. Agrupar según periodo
	useEffect(() => {
		const start = new Date(selectedDate);
		let filtered = [];

		if (period === 'week') {
			// Obtener el lunes de la semana
			const day = start.getDay();
			const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Ajustar si es domingo
			const monday = new Date(start.setDate(diff));
			const sunday = new Date(monday);
			sunday.setDate(monday.getDate() + 6);

			filtered = allJournals
				.filter((j) => j.date >= monday && j.date <= sunday)
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
		<Box sx={{ width: '100%', p: { xs: 2, sm: 3 }, background: '#E3E9CF', borderRadius: '1rem' }}>
			<Typography variant='h4' sx={styleText.Titulo}>
				Mis emociones
			</Typography>

			{/* Filtro de periodo */}
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

			{/* Gráfica dinámica */}
			<ResponsiveContainer width='100%' height={300}>
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
					<BarChart data={filteredData}>
						<XAxis dataKey='emotion' />
						<YAxis />
						<Tooltip />
						<Bar dataKey='count' fill='#7C77B9' />
					</BarChart>
				)}

				{period === 'year' && (
					<BarChart data={filteredData}>
						<XAxis dataKey='month' />
						<YAxis />
						<Tooltip />
						<Bar dataKey='emotionValue' fill='#49499D' />
					</BarChart>
				)}
			</ResponsiveContainer>
		</Box>
	);
}
