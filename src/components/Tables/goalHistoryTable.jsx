import React, { useState } from 'react';
import { goalHistoryData } from '../../Data/goalData';
import { filterByTime } from '../../utils';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';
const GoalHistoryCard = ({ data }) => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const [selectedStatus, setSelectedStatus] = useState('All');

	const filteredData = data.filter((item) => {
		if (selectedStatus === 'All') return true;
		return item.status === selectedStatus;
	});

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '660px',
		height: '341px',
		padding: '28px',
		borderRadius: '24px',
		backgroundColor: '#FCE2A9',
		boxSizing: 'border-box',
		gap: '30px',
		fontFamily: "'Manrope', sans-serif",
		overflow: 'hidden',
	};

	const headerStyle = {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	};

	const iconTitleStyle = {
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

	const filtersStyle = {
		display: 'flex',
		gap: '20px',
		fontWeight: 600,
		color: '#333',
	};

	const tableWrapper = {
		overflowY: 'auto',
		height: '100%',
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
				<div style={iconTitleStyle}>
					<div style={iconContainer}>
						<AttachMoney style={{ fontSize: '24px', color: '#333' }} />
					</div>
					<div style={titleStyle}>Goal History</div>
				</div>
				<div style={filtersStyle}>
					<span>
						Today <ArrowDropDown />
					</span>
					<span>
						Week <ArrowDropDown />
					</span>
					<span>
						Month <ArrowDropDown />
					</span>
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
