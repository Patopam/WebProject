import { AttachMoney } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSpends } from '../../services/firebaseUtils';
const ExpensesDay = ({ data }) => {
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
								<AttachMoney style={{ fontSize: '24px', color: '#333' }} />
							</div>
							<div style={headerTitleStyle}>Expenses of the day</div>
						</div>
					</div>
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
									<td style={tdStyle}>{item.date?.toDate().toLocaleDateString()}</td>
									<td style={tdStyle}>{item.price}</td>
									<td style={tdStyle}>{item.category}</td>
								</tr>
							))}
						</tbody>
					</table>
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
	height: '361px',
	minHeight: '341px',
	padding: '1.75rem',
	borderRadius: '1.5rem',
	backgroundColor: '#CECAE4',
	boxSizing: 'border-box',
	gap: '8.8%',
	fontFamily: "'Manrope', sans-serif",
	overflow: 'hidden',
};

const headerStyle = {
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const headerLeftStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
	maxWidth: 'calc(100% - 20px)',
};

const iconContainerStyle = {
	width: '37px',
	height: '37px',
	borderRadius: '50%',
	backgroundColor: '#AFA8D1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const headerTitleStyle = {
	fontSize: '18px',
	fontWeight: 300,
	color: '#333',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

const allViewStyle = {
	fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
	color: '#333',
	fontWeight: 400,
};

const tableStyle = {
	width: '100%',
	borderCollapse: 'separate',
	borderSpacing: '1.8% 3.5%',
	fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', // Responsive between 12px and 14.5px
};

const thStyle = {
	textAlign: 'left',
	fontWeight: 600,
	color: '#333',
	padding: '0 1.2%',
};

const tdStyle = {
	backgroundColor: 'white',
	padding: '1.5% 2.1%',
	borderRadius: '0.75rem',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};
