import { useEffect, useState } from 'react';
import { AttachMoney, ArrowDropDown } from '@mui/icons-material';
import { filterByTime } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpends } from '../../services/firebaseUtils';

const ExpenditureHistoryTable = () => {
	const Dispatch = useDispatch();
	const [selectedTime, setSelectedTime] = useState('Today');
	const [Data, setData] = useState();
	const [loadign, setLoading] = useState(true);
	const timeOptions = ['Today', 'Week', 'Month'];

	const id = useSelector((state) => state.userId.id);
	useEffect(() => {
		fetchSpends({ uid: id })
			.then((Spends) => setData([...Spends]))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			{loadign ? (
				<p>loading ... </p>
			) : (
				<div style={containerStyle}>
					{/* Header */}
					<div style={headerStyle}>
						<div style={iconContainer}>
							<AttachMoney style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#333' }} />
						</div>
						<div style={titleStyle}>Expenditure History</div>
					</div>

					{/* Filters */}
					<div style={filterBoxStyle}>
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
					<div style={tableWrapper}>
						<table style={tableStyle}>
							<thead>
								<tr>
									<th style={thStyle}>Date</th>
									<th style={thStyle}>Amount</th>
									<th style={thStyle}>Category</th>
								</tr>
							</thead>
							<tbody>
								{Data.map((item) => (
									<tr key={item.id}>
										<td style={tdStyle}>{item.date?.toDate().toLocaleDateString()}</td>
										<td style={tdStyle}>{item.price}</td>
										<td style={tdStyle}>{item.category}</td>
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
export default ExpenditureHistoryTable;

const containerStyle = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '23rem',
	minHeight: '23rem',
	padding: '3.5%',
	borderRadius: '1.5rem',
	backgroundColor: '#CECAE4',
	boxSizing: 'border-box',
	gap: '2.5%',
	fontFamily: "'Manrope', sans-serif",
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
	backgroundColor: '#AFA8D1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const titleStyle = {
	fontSize: 'clamp(1rem, 2vw, 1.125rem)',
	fontWeight: 300,
	color: '#333',
};

const filterBoxStyle = {
	display: 'flex',
	justifyContent: 'flex-start',
	backgroundColor: '#D1CCE4',
	borderRadius: '0.75rem',
	padding: '1% 2%',
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
	fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', // Responsive entre 12px y 14.5px
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
