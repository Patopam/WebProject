import React, { useState } from 'react';

export default function MonthFilter() {
	const [selectedMonth, setSelectedMonth] = useState('All');

	const months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Agu', 'Jul', 'Sep', 'Oct', 'Nov', 'Dic'];

	return (
		<div className='flex flex-wrap gap-2'>
			{months.map((month) => (
				<button
					key={month}
					className={`rounded-full bg-indigo-600 text-white px-6 py-3 text-center w-14 h-11 flex items-center justify-center`}
					onClick={() => setSelectedMonth(month)}
				>
					{month}
				</button>
			))}
		</div>
	);
}
