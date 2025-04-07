import React from 'react';
import styled from '@emotion/styled';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// 🟣 Contenedor principal tipo card
const TableCard = styled.div`
	background-color: #d6d1f8;
	border-radius: 20px;
	padding: 20px;
	width: 500px;
	font-family: 'Manrope', sans-serif;
	color: #333;
`;

// 🟣 Header de la card
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const IconWrapper = styled.div`
	background-color: #b29cf5;
	border-radius: 50%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h3`
	font-size: 1.2rem;
	margin: 0;
`;

// 🟣 Estilo para la tabla
const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 10px;
	font-size: 0.95rem;

	th {
		text-align: left;
		font-weight: 600;
		padding: 8px;
	}

	td {
		background-color: white;
		border-radius: 10px;
		padding: 10px;
	}
`;

// 🟣 Contenedor scrollable
const ScrollContainer = styled.div`
	max-height: 180px;
	overflow-y: auto;

	scrollbar-width: thin;
	scrollbar-color: #d4c4f7 transparent;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #d4c4f7;
		border-radius: 10px;
		border: 1px solid transparent;
	}
`;

const ExpensesTable = ({ data }) => {
	return (
		<TableCard>
			<Header>
				<TitleContainer>
					<IconWrapper>
						<AttachMoneyIcon style={{ color: '#fff' }} />
					</IconWrapper>
					<Title>Expenses of the day</Title>
				</TitleContainer>
				<span style={{ fontSize: '0.9rem', color: '#333' }}>All view</span>
			</Header>

			<Table>
				<thead>
					<tr>
						<th>Spend</th>
						<th>Price</th>
						<th>Category</th>
					</tr>
				</thead>
			</Table>

			<ScrollContainer>
				<Table>
					<tbody>
						{data.map((item, index) => (
							<tr key={index}>
								<td>{item.spend}</td>
								<td>{item.price}</td>
								<td>{item.category}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</ScrollContainer>
		</TableCard>
	);
};

export default ExpensesTable;
