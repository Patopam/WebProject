import React from 'react';
import { Typography, Container, Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpensesLineChart() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

	const styleText = {
		Linea: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: '1rem',
			fontStyle: 'normal',
			fontWeight: 400,
			lineHeight: 'normal',
			color: '#000000',
			marginTop: '1.25rem',
			textAlign: 'center',
		},
		Titulo: {
			color: 'var(--Neutral-1000, #333)',
			fontFamily: 'Manrope, sans-serif',
			fontSize: {
				xs: '1.5rem', // Más pequeño en móviles
				sm: '1.75rem', // Mediano en tablets
				md: '2rem', // Normal en escritorio
			},
			fontWeight: 400,
			color: '#000000',
			marginTop: '1.25rem',
			marginBottom: '1rem',
			textAlign: 'center',
		},
	};

	// Datos de gastos para la semana
	const expensesData = [
		{ day: 'Lunes', expense: 51 },
		{ day: 'Martes', expense: 13 },
		{ day: 'Miércoles', expense: 8 },
		{ day: 'Jueves', expense: 70 },
		{ day: 'Viernes', expense: 34 },
		{ day: 'Sábado', expense: 22 },
		{ day: 'Domingo', expense: 18 },
	];

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
						{`${payload[0].payload.day}: $${payload[0].payload.expense}`}
					</Typography>
				</Box>
			);
		}
		return null;
	};

	// Punto personalizado
	const CustomDot = (props) => {
		const { cx, cy } = props;
		const radius = isMobile ? 5 : isTablet ? 6 : 7; // Tamaño ajustado según dispositivo

		return <circle cx={cx} cy={cy} r={radius} fill='#49499D' stroke='white' strokeWidth={isMobile ? 1.5 : 2} />;
	};

	// Determinar altura del gráfico basada en el tamaño de la pantalla
	const chartHeight = {
		xs: 220, // Altura en móviles
		sm: 280, // Altura en tablets
		md: 320, // Altura en desktop
	};

	const getYAxisTicks = () => {
		if (isMobile) {
			return [0, 20, 40, 60, 80]; // Menos ticks en móvil
		}
		return [0, 10, 20, 30, 40, 50, 60, 70, 80]; // Todos los ticks en escritorio
	};

	return (
		<Box
			sx={{
				width: '100%',
				padding: { xs: '0.5rem', sm: '1rem', md: '1.5rem' },
				backgroundColor: '#CECAE4',
				borderRadius: '1rem',
			}}
		>
			<Typography variant='h4' sx={styleText.Titulo}>
				Weekly Expenses
			</Typography>

			<ResponsiveContainer
				width='100%'
				height={
					theme.breakpoints.values.xs ? chartHeight.xs : theme.breakpoints.values.sm ? chartHeight.sm : chartHeight.md
				}
				style={{ marginBottom: '2rem' }}
			>
				<LineChart
					data={expensesData}
					margin={{
						top: 20,
						right: isMobile ? 20 : 40,
						left: isMobile ? 20 : 40,
						bottom: 30,
					}}
					style={styleText.Linea}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis
						dataKey='day'
						height={40}
						fontSize={isMobile ? '0.75rem' : '0.875rem'}
						tick={{ fill: '#666' }}
						tickMargin={15}
						angle={isMobile && expensesData.some((d) => d.day.length > 6) ? -30 : 0}
						textAnchor={isMobile && expensesData.some((d) => d.day.length > 6) ? 'end' : 'middle'}
					/>
					<YAxis
						domain={[0, 80]}
						ticks={getYAxisTicks()}
						tickFormatter={(value) => `$${value}`}
						fontSize={isMobile ? '0.75rem' : '0.875rem'}
						tick={{ fill: '#666' }}
						width={isMobile ? 35 : 45} 
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
						dataKey='expense'
						name='Gasto'
						stroke='#49499D'
						strokeWidth={isMobile ? 3 : 4}
						dot={<CustomDot />}
						activeDot={{ r: isMobile ? 6 : 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Box>
	);
}
