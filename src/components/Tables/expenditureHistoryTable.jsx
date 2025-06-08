import { useEffect, useState } from 'react';
import { AttachMoney, ArrowDropDown, CalendarToday } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { fetchSpends } from '../../services/firebaseUtils';

const ExpenditureHistoryTable = () => {
	const [selectedTime, setSelectedTime] = useState('Today');
	const [Data, setData] = useState([]);
	const [FilteredData, setFilteredData] = useState([]);
	const [Loading, setLoading] = useState(true);
	const id = useSelector((state) => state.userId.id);

	const timeOptions = ['Today', 'Week', 'Month'];

	useEffect(() => {
		fetchSpends({ uid: id })
			.then((Spends) => {
				const sorted = [...Spends].sort((a, b) => b.date?.seconds - a.date?.seconds);
				setData(sorted);
				setFilteredData(sorted);
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (!Data) return;
		const now = new Date();
		let filtered = [];

		if (selectedTime === 'Today') {
			filtered = Data.filter((item) => {
				const date = item.date?.toDate();
				return (
					date?.getDate() === now.getDate() &&
					date?.getMonth() === now.getMonth() &&
					date?.getFullYear() === now.getFullYear()
				);
			});
		} else if (selectedTime === 'Week') {
			const startOfWeek = new Date(now);
			startOfWeek.setDate(now.getDate() - now.getDay());
			startOfWeek.setHours(0, 0, 0, 0);

			filtered = Data.filter((item) => {
				const date = item.date?.toDate();
				return date >= startOfWeek && date <= now;
			});
		} else {
			filtered = Data;
		}

		setFilteredData(filtered);
	}, [selectedTime, Data]);

	return (
		<div>
			{Loading ? (
				<p>Loading...</p>
			) : (
				<div style={containerStyle}>
					<div style={headerStyle}>
						<div style={iconContainerStyle}>
							<AttachMoney style={{ fontSize: '1rem', color: '#333' }} />
						</div>
						<div style={headerTitleStyle}>Expenditure History</div>
					</div>

					<div style={filterWrapperStyle}>
						{timeOptions.map((option) => (
							<span
								key={option}
								onClick={() => setSelectedTime(option)}
								style={{
									textDecoration: selectedTime === option ? 'underline' : 'none',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									gap: '2px',
								}}
							>
								{option} <ArrowDropDown fontSize='small' />
							</span>
						))}

						{selectedTime === 'Month' && (
							<CalendarToday
								sx={{
									color: '#333',
									fontSize: '1.2rem',
								}}
							/>
						)}
					</div>

					<div style={scrollWrapperStyle}>
						<table style={tableStyle}>
							<thead>
								<tr>
									<th style={thStyle}>Date</th>
									<th style={thStyle}>Amount</th>
									<th style={thStyle}>Category</th>
								</tr>
							</thead>
							<tbody>
								{FilteredData.map((item) => (
									<tr key={item.id}>
										<td style={tdStyle}>{item.date?.toDate().toLocaleDateString()}</td>
										<td style={tdStyle}>${Number(item.amount).toLocaleString('es-CO')}</td>
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
	minHeight: '320px',
	padding: '1.5rem',
	borderRadius: '1.5rem',
	backgroundColor: '#CECAE4',
	boxSizing: 'border-box',
	fontFamily: "'Manrope', sans-serif",
};

const headerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	marginBottom: '1rem',
};

const iconContainerStyle = {
	width: '2rem',
	height: '2rem',
	borderRadius: '50%',
	backgroundColor: '#AFA8D1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const headerTitleStyle = {
	fontSize: '0.95rem',
	fontWeight: 400,
	color: '#333',
};

const filterWrapperStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.8rem',
	fontWeight: 600,
	color: '#333',
	backgroundColor: '#B0A9D0',
	borderRadius: '0.75rem',
	padding: '0.4rem 1rem',
	marginBottom: '0.8rem',
	fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
};

const scrollWrapperStyle = {
	overflowY: 'auto',
	maxHeight: '200px',
	paddingRight: '0.5rem',
};

const tableStyle = {
	width: '100%',
	borderCollapse: 'separate',
	borderSpacing: '0.4rem 0.6rem',
	fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
};

const thStyle = {
	textAlign: 'left',
	fontWeight: 600,
	color: '#333',
	padding: '0 0.3rem',
};

const tdStyle = {
	backgroundColor: 'white',
	padding: '0.6rem 0.6rem',
	borderRadius: '0.6rem',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	maxWidth: '100%',
};
