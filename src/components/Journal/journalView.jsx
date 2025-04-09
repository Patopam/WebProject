import React, { useState } from 'react';

// Componente principal que integra el filtro y las tarjetas
export default function JournalView() {
	const [selectedMonth, setSelectedMonth] = useState('All');

	// Datos de ejemplo con mes incluido para cada entrada
	const journalData = [
		{
			Month: 1,
			entries: [
				{
					day: 'Monday',
					month: 'Jan',
					content:
						"Today felt like a blur—so much to do, yet it feels like I barely moved forward. Maybe progress isn't always obvious in the moment. I just have to trust that each small step is adding up to something bigger.",
					color: 'bg-lime-300',
				},
				{
					day: 'Tuesday',
					month: 'Jan',
					content:
						"Some days feel heavier than others, but even the smallest wins count. I'll be kind to myself and try again tomorrow.",
					color: 'bg-orange-300',
				},
			],
		},
		{
			Month: 2,
			entries: [
				{
					day: 'Monday',
					month: 'Feb',
					content:
						"Today felt like a blur—so much to do, yet it feels like I barely moved forward. Maybe progress isn't always obvious in the moment. I just have to trust that each small step is adding up to something bigger.",
					color: 'bg-blue-300',
				},
				{
					day: 'Tuesday',
					month: 'Feb',
					content:
						"Some days feel heavier than others, but even the smallest wins count. I'll be kind to myself and try again tomorrow.",
					color: 'bg-purple-200',
				},
			],
		},
		{
			Month: 3,
			entries: [
				{
					day: 'Monday',
					month: 'Mar',
					content:
						"Today felt like a blur—so much to do, yet it feels like I barely moved forward. Maybe progress isn't always obvious in the moment. I just have to trust that each small step is adding up to something bigger.",
					color: 'bg-yellow-200',
				},
			],
		},
	];

	// Filtrar las entradas basado en el mes seleccionado
	const filteredData =
		selectedMonth === 'All'
			? journalData
			: journalData
					.map((week) => ({
						...week,
						entries: week.entries.filter((entry) => entry.month === selectedMonth),
					}))
					.filter((week) => week.entries.length > 0);

	return (
		<div className='flex flex-col space-y-6'>
			<MonthFilter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
			<JournalCards journalData={filteredData} />
		</div>
	);
}

// Componente de filtros por mes
function MonthFilter({ selectedMonth, setSelectedMonth }) {
	const months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Agu', 'Jul', 'Sep', 'Oct', 'Nov', 'Dic'];

	return (
		<div className='flex flex-wrap gap-2'>
			{months.map((month) => (
				<button
					key={month}
					className={`rounded-full ${
						selectedMonth === month ? 'bg-indigo-700' : 'bg-indigo-600'
					} text-white px-6 py-3 text-center w-14 h-11 flex items-center justify-center`}
					onClick={() => setSelectedMonth(month)}
				>
					{month}
				</button>
			))}
		</div>
	);
}

// Componente de tarjetas de diario
function JournalCards({ journalData }) {
	if (journalData.length === 0) {
		return <div className='text-lg text-gray-600'>No hay entradas para este mes.</div>;
	}

	return (
		<div className='flex flex-col space-y-8'>
			{journalData.map((week) => (
				<div key={week.week} className='mb-6'>
					<h2 className='text-4xl font-bold mb-4 text-gray-800'>Month {week.week}</h2>
					<div className='flex flex-wrap gap-4'>
						{week.entries.map((entry, index) => (
							<div key={index} className={`${entry.color} rounded-xl p-6 w-96 h-96 flex flex-col`}>
								<h3 className='text-3xl font-bold text-indigo-800 mb-4'>{entry.day}</h3>
								<p className='text-indigo-800 text-lg'>{entry.content}</p>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
