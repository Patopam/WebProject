import { AttachMoney, Edit } from '@mui/icons-material';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSpends } from '../../services/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

const ExpensesDay = () => {
	const [Data, setData] = useState();
	const [Loading, setLoading] = useState(true);
	const id = useSelector((state) => state.userId.id);
	const navigate = useNavigate();

	useEffect(() => {
		fetchSpends({ uid: id })
			.then((Spends) => {
				const sorted = [...Spends].sort((a, b) => b.date?.seconds - a.date?.seconds);
				setData(sorted);
			})
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
								<AttachMoney style={{ fontSize: '1.2rem', color: '#333' }} />
							</div>
							<div style={headerTitleStyle}>Expenses of the day</div>
						</div>
					</div>

					<div style={scrollWrapperStyle}>
						<table style={tableStyle}>
							<thead>
								<tr>
									<th style={thStyle}>Date</th>
									<th style={thStyle}>Price</th>
									<th style={thStyle}>Category</th>
									<th style={thStyle}></th>
								</tr>
							</thead>
							<tbody>
								{Data.map((item) => (
									<tr key={item.id}>
										<td style={{ ...tdStyle, maxWidth: '6rem' }}>{item.date?.toDate().toLocaleDateString()}</td>
										<td style={tdStyle}>${Number(item.amount).toLocaleString('es-CO')}</td>
										<td style={{ ...tdStyle, maxWidth: '7rem' }}>{item.category}</td>
										<td style={iconTdStyle}>
											<IconButton
												onClick={() =>
													navigate(`/finance/edit-spending/${item.id}`, {
														state: { redirectTo: '/dashboard' },
													})
												}
												sx={{
													padding: '4px',
												}}
											>
												<Edit sx={{ fontSize: 13, color: '#333' }} />
											</IconButton>
										</td>
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

const iconTdStyle = {
	...tdStyle,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};
