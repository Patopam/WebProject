import { AttachMoney } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSpends } from '../../services/firebaseUtils';

const ExpensesDay = () => {
	const [Data, setData] = useState();
	const [Loading, setLoading] = useState(true);
	const id = useSelector((state) => state.userId.id);

	useEffect(() => {
		fetchSpends({ uid: id })
			.then((Spends) => setData([...Spends]))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			{Loading ? (
				<p>Loading...</p>
			) : (
				<div style={containerStyle}>
					<div style={headerStyle}>
						<div style={headerLeftStyle}>
							<div style={iconContainerStyle}>
								<AttachMoney style={{ fontSize: '1rem', color: '#333' }} />
							</div>
							<div style={headerTitleStyle}>Expenses of the day</div>
						</div>
					</div>

					<div style={scrollWrapperStyle}>
						<table style={tableStyle}>
							<thead>
								<tr>
									<th style={thStyle}>Spend</th>
									<th style={thStyle}>Price</th>
									<th style={thStyle}>Category</th>
								</tr>
							</thead>
							<tbody>
								{Data.map((item) => (
									<tr key={item.id}>
										<td style={{ ...tdStyle, maxWidth: '6rem' }}>{item.date?.toDate().toLocaleDateString()}</td>
										<td style={tdStyle}>${item.amount}</td>
										<td style={{ ...tdStyle, maxWidth: '7rem' }}>{item.category}</td>
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

export default ExpensesDay;

const containerStyle = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '320px',
	minHeight: '320px',
	padding: '1.5rem',
	borderRadius: '1.5rem',
	backgroundColor: '#CECAE4',
	boxSizing: 'border-box',
	fontFamily: "'Manrope', sans-serif",
	overflow: 'hidden',
};

const scrollWrapperStyle = {
	overflowY: 'auto',
	maxHeight: '200px',
	paddingRight: '0.5rem',
};

const headerStyle = {
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: '0.6rem',
};

const headerLeftStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	maxWidth: '100%',
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
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
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
