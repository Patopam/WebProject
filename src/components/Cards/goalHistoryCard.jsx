import React, { useState } from 'react';
import { goalHistoryData } from '../../Data/goalHistoryData';
import { filterByTime } from '../../utils/filters';

const GoalHistoryCard = () => {
	const [timeFilter, setTimeFilter] = useState('All');
	const [statusFilter, setStatusFilter] = useState('All');

	const filteredGoals = goalHistoryData.filter((goal) => {
		const byTime = timeFilter === 'All' ? true : filterByTime(goal.date, timeFilter);
		const byStatus = statusFilter === 'All' ? true : goal.status === statusFilter.toLowerCase();
		return byTime && byStatus;
	});

	return (
		<div className='goal-history-card'>
			<h3>Goal History</h3>

			<div className='filters'>
				<span onClick={() => setTimeFilter('Today')}>Today</span>
				<span onClick={() => setTimeFilter('Week')}>Week</span>
				<span onClick={() => setTimeFilter('Month')}>Month</span>
				<span onClick={() => setStatusFilter('Completed')}>Completed</span>
				<span onClick={() => setStatusFilter('Failed')}>Failed</span>
			</div>

			<div className='goal-table'>
				<div className='table-header'>
					<span>Date</span>
					<span>Goal</span>
					<span>Amount</span>
					<span>Status</span>
				</div>

				{filteredGoals.map((goal, index) => (
					<div key={index} className='table-row'>
						<span>{goal.date}</span>
						<span>{goal.title}</span>
						<span>${goal.amount}</span>
						<span>{goal.status === 'completed' ? 'Completed' : 'Failed'}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default GoalHistoryCard;
