import React from 'react';

export default function JournalCards() {
	const journalEntries = [
		{
			week: 1,
			entries: [
				{
					day: 'Monday',
					content:
						"Today felt like a blur—so much to do, yet it feels like I barely moved forward. Maybe progress isn't always obvious in the moment. I just have to trust that each small step is adding up to something bigger.",
					color: 'bg-lime-300',
				},
				{
					day: 'Tuesday',
					content:
						"Some days feel heavier than others, but even the smallest wins count. I'll be kind to myself and try again tomorrow.",
					color: 'bg-orange-300',
				},
			],
		},
		{
			week: 2,
			entries: [
				{
					day: 'Monday',
					content:
						"Today felt like a blur—so much to do, yet it feels like I barely moved forward. Maybe progress isn't always obvious in the moment. I just have to trust that each small step is adding up to something bigger.",
					color: 'bg-blue-300',
				},
			],
		},
	];

	return (
		<div className='flex flex-col space-y-8'>
			{journalEntries.map((week) => (
				<div key={week.week} className='mb-6'>
					<h2 className='text-4xl font-bold mb-4 text-gray-800'>Week {week.week}</h2>
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
