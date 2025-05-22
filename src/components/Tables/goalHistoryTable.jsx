import { useState, useEffect, use } from 'react';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';
import { fetchGoal } from '../../services/firebaseUtils';
import { useSelector } from 'react-redux';

const GoalHistoryCard = () => {
	const id = useSelector((state) => state.userId.id);
	const [selectedTime, setSelectedTime] = useState('Today');
	const [selectedStatus, setSelectedStatus] = useState('All');
	const [Loadign, setLoading] = useState(true);
	const [Data, setData] = useState();
	useEffect(() => {
		fetchGoal({ uid: id })
			.then((Goals) => setData([...Goals]))
			.finally(() => setLoading(false));
		console.log(Data);
	}, []);

	const timeOptions = ['Today', 'Week', 'Month'];
	const statusOptions = ['All', 'Completed', 'Failed'];

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '23rem',
		minHeight: '23rem',
		padding: '3.5%',
		borderRadius: '1.5rem',
		backgroundColor: '#FCE2A9',
		boxSizing: 'border-box',
		fontFamily: "'Manrope', sans-serif",
		gap: '2.5%',
		overflow: 'hidden',
	};

	const headerStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '2%',
	};

	const iconContainer = {
		width: '4.6%',
		minWidth: '30px',
		aspectRatio: '1 / 1',
		borderRadius: '50%',
		backgroundColor: '#FACD69',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	};

	const titleStyle = {
		fontSize: 'clamp(1rem, 2vw, 1.125rem)', // Responsive 16px y 18px
		fontWeight: 300,
		color: '#333',
	};

	const filterBoxStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: '#F5D889',
		borderRadius: '0.75rem',
		padding: '1% 2%',
	};

	const filterGroup = {
		display: 'flex',
		gap: '2.5%',
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
		borderSpacing: '1.5% 3%',
		fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', // Responsive  12px y 14.5px
	};

	const thStyle = {
		textAlign: 'left',
		fontWeight: 600,
		color: '#333',
		padding: '0 1%',
	};

	const tdStyle = {
		backgroundColor: 'white',
		padding: '1.25% 1.75%',
		borderRadius: '0.75rem',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	};

	return (
		<div>
			{Loadign ? (
				<p>Loading</p>
			) : (
				<div style={containerStyle}>
					<div style={headerStyle}>
						<div style={iconContainer}>
							<AttachMoney style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#333' }} />
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
								{Data.map((goal) => (
									<tr key={goal.id}>
										<td style={tdStyle}>{goal.date?.toDate().toLocaleDateString()}</td>
										<td style={tdStyle}>{goal?.description}</td>
										<td style={tdStyle}>{goal?.price}</td>
										<td style={tdStyle}>{goal?.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default GoalHistoryCard;
