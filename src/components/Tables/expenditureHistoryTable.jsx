import React, { useState } from 'react';
import { AttachMoney } from '@mui/icons-material';
import { filterByTime } from '../../utils';

const ExpenditureHistoryTable = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const timeOptions = ['Today', 'Week', 'Month'];

	const filteredData = filterByTime(data, selectedTime);

	return (
		<div>
			{/* Header */}
			<div>
				<div>
					<AttachMoney />
				</div>
				<div>Expenditure History</div>
			</div>

			<div>
				{timeOptions.map((option) => (
					<span key={option} onClick={() => setSelectedTime(option)}>
						{option}
					</span>
				))}
			</div>

			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Amount</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.map((item, index) => (
						<tr key={index}>
							<td>{item.date}</td>
							<td>{item.amount}</td>
							<td>{item.category}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ExpenditureHistoryTable;
