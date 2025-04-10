import React, { useState } from 'react';
import { filterByTime } from '../../utils';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';

const GoalHistoryCard = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const [selectedStatus, setSelectedStatus] = useState('All');

	const filteredByTime = filterByTime(data, selectedTime);
	const filteredData = filteredByTime.filter((item) =>
		selectedStatus === 'All' ? true : item.status.toLowerCase() === selectedStatus.toLowerCase()
	);

	const timeOptions = ['Today', 'Week', 'Month'];
	const statusOptions = ['All', 'Completed', 'Failed'];

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '660px',
		height: '341px',
		padding: '28px',
		borderRadius: '24px',
		backgroundColor: '#FCE2A9',
		boxSizing: 'border-box',
		fontFamily: "'Manrope', sans-serif",
		gap: '20px',
		overflow: 'hidden',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
	};

	const iconContainer = {
		width: '37px',
		height: '37px',
		borderRadius: '50%',
		backgroundColor: '#FACD69',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontSize: '18px',
		fontWeight: 300,
		color: '#333',
	};

	const filterBoxStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: '#F5D889',
		borderRadius: '12px',
		padding: '8px 16px',
	};

	const filterGroup = {
		display: 'flex',
		gap: '20px',
		fontWeight: 600,
		color: '#333',
		cursor: 'pointer',
	};

	const tableWrapper = {
		overflowY: 'auto',
		height: '160px',
		scrollbarWidth: 'none',
		msOverflowStyle: 'none',
	};

	const tableStyle = {
		width: '100%',
		borderCollapse: 'separate',
		borderSpacing: '12px 12px',
		fontSize: '14.5px',
	};

	const thStyle = {
		textAlign: 'left',
		fontWeight: 600,
		color: '#333',
		padding: '0 8px',
	};

	const tdStyle = {
		backgroundColor: 'white',
		padding: '10px 14px',
		borderRadius: '12px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	return (
		<div style={containerStyle}>
			<div style={headerStyle}>
				<div style={iconContainer}>
					<AttachMoney style={{ fontSize: '24px', color: '#333' }} />
				</div>
				<div style={titleStyle}>Goal History</div>
			</div>

			<div style={filterBoxStyle}>
				<div style={filterGroup}>
					{timeOptions.map((option) => (
						<span
							key={option}
							onClick={() => setSelectedTime(option)}
							style={{
								textDecoration: selectedTime === option ? 'underline' : 'none',
								display: 'flex',
								alignItems: 'center',
								gap: '2px',
							}}
						>
							{option} <ArrowDropDown fontSize='small' />
						</span>
					))}
				</div>

				<div style={filterGroup}>
					{statusOptions.map((option) => (
						<span
							key={option}
							onClick={() => setSelectedStatus(option)}
							style={{
								textDecoration: selectedStatus === option ? 'underline' : 'none',
							}}
						>
							{option}
						</span>
					))}
				</div>
			</div>

			<div style={tableWrapper}>
				<table style={tableStyle}>
					<thead>
						<tr>
							<th style={thStyle}>Date</th>
							<th style={thStyle}>Goal</th>
							<th style={thStyle}>Amount</th>
							<th style={thStyle}>Status</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((goal, index) => (
							<tr key={index}>
								<td style={tdStyle}>{goal.date}</td>
								<td style={tdStyle}>{goal.title}</td>
								<td style={tdStyle}>{goal.amount}</td>
								<td style={tdStyle}>{goal.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default GoalHistoryCard;
