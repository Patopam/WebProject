import React from 'react';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import styled from '@emotion/styled';

const CardContainer = styled.div`
	background-color: #fcd8c2;
	padding: 20px;
	border-radius: 24px;
	width: 427px;
	height: 238px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Manrope', sans-serif;
	box-sizing: border-box;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 371px;
	height: 190px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

const IconContainer = styled.div`
	background-color: #f99f75;
	border-radius: 50%;
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 17px;
	height: 17px;
	margin-right: 10px;
`;

const Title = styled.div`
	font-weight: 300;
	font-size: 18px;
	color: #333;
`;

const Stats = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 10px;
	margin-top: 10px;
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
	font-size: 28px;
	font-weight: 700;
	color: #333;
	line-height: 125%;
	margin-top: auto;
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
