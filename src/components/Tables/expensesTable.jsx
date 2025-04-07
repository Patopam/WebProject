import React from 'react';
import styled from '@emotion/styled';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const TableCard = styled.div`
	width: 544px;
	height: 341px;
	padding: 28px;
	background: #d3d0eb;
	border-radius: 24px;
	display: flex;
	flex-direction: column;
	font-family: 'Manrope', sans-serif;
	color: #333;
	box-sizing: border-box;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const IconWrapper = styled.div`
	width: 37px;
	height: 37px;
	background-color: #b29cf5;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h3`
	font-size: 18px;
	font-weight: 400;
	margin: 0;
`;

const ViewAll = styled.span`
	font-size: 14px;
	color: #333;
`;

const ScrollContainer = styled.div`
	flex: 1;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: #ccc transparent;

	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ccc;
		border-radius: 10px;
	}
`;

const Table = styled.table`
	width: 100%;
	border-collapse: separate;
	border-spacing: 0 12px;
	font-size: 14.5px;

	th {
		text-align: left;
		font-weight: 600;
		padding: 4px 12px;
		color: #333;
	}

	td {
		background-color: white;
		border-radius: 12px;
		padding: 10px 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 150px;
	}
`;

const ExpensesTable = ({ data }) => {
	return (
		<TableCard>
			<Header>
				<TitleContainer>
					<IconWrapper>
						<AttachMoneyIcon style={{ fontSize: 24, color: '#fff' }} />
					</IconWrapper>
					<Title>Expenses of the day</Title>
				</TitleContainer>
				<ViewAll>All view</ViewAll>
			</Header>

			<ScrollContainer>
				<Table>
					<thead>
						<tr>
							<th>Spend</th>
							<th>Price</th>
							<th>Category</th>
						</tr>
					</thead>
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
