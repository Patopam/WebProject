import React from 'react';
import { goalHistoryData } from '../../Data/goalHistoryData';

const GoalHistoryCard = () => {
	return (
		<div className='goal-history-card'>
			<h3>Goal History</h3>

			<div className='filters'>
				<span>Today</span>
				<span>Week</span>
				<span>Month</span>
				<span>Completed</span>
				<span>Failed</span>
			</div>

			<div className='goal-table'>
				<div className='table-header'>
					<span>Date</span>
					<span>Goal</span>
					<span>Amount</span>
					<span>Status</span>
				</div>

				{goalHistoryData.map((goal, index) => (
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
