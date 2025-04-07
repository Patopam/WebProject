import React from 'react';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import styled from '@emotion/styled';

const CardContainer = styled.div`
	background-color: #fcd8c2;
	padding: 20px;
	border-radius: 20px;
	width: 280px;
	font-family: 'Manrope', sans-serif;
`;
const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
`;

const IconContainer = styled.div`
	background-color: #f99f75;
	border-radius: 50%;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 15px;
	height: 15px;
`;
const Title = styled.div`
	margin-left: 10px;
	font-weight: 500;
	color: #333;
`;

const Stats = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 10px;
`;

const Percentage = styled.div`
	font-size: 2.5rem;
	font-weight: 600;
	color: #000;
`;

const Text = styled.div`
	font-size: 0.9rem;
	color: #444;
	line-height: 1.2;

	p {
		margin: 0;
	}
`;

const Emotion = styled.div`
	font-size: 1.8rem;
	font-weight: 400;
	color: #333;
`;

const FeelingsCard = () => {
	return (
		<CardContainer>
			<ContentWrapper>
				<Header>
					<IconContainer>
						<SellOutlinedIcon style={{ color: '#000000' }} />
					</IconContainer>
					<Title>Feelings & Finances</Title>
				</Header>

				<Stats>
					<Percentage>50%</Percentage>
					<Text>
						<p>
							Of your <strong>expenses</strong>
							<br />
							are when you are
						</p>
					</Text>
				</Stats>

				<Emotion>stressed</Emotion>
			</ContentWrapper>
		</CardContainer>
	);
};

export default FeelingsCard;
