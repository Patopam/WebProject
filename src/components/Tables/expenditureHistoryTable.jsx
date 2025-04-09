import React from 'react';
import { AttachMoney } from '@mui/icons-material';

const ExpenditureHistoryTable = ({ data }) => {
	return (
		<div>
			{/* Header */}
			<div>
				<div>
					<AttachMoney />
				</div>
				<div>Expenditure History</div>
			</div>

			{/* Filtros (aún sin funcionalidad) */}
			<div>
				<span>Today</span>
				<span>Week</span>
				<span>Month</span>
			</div>

			{/* Tabla base */}
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Amount</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
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
