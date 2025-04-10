import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import FeelingsCard from '../../components/Cards/FeelingsCard';
import GoalProgressCard from '../../components/Cards/goal';
import { Typography, Container, Stack, Box } from '@mui/material';
import EmotionsLineChartCentered from '../../components/Charts/ChartsEmociones';
import ExpensesLineChart from '../../components/Charts/ChartsGastos';
import './analytics.css';
import { useNavigate } from 'react-router-dom';
function Analytics() {
	let navigate = useNavigate();
	const goLogin = () => {
		navigate('/log');
	};
	return (
		<div className='analytics-container'>
			<Menu />
			<div className='analytics-content'>
				<div className='analytics-header'>
					<Header title='Analytics' subtitle='Set goals and look at your track record.' />
					<div className='analytics-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>
				<Container className='analytics-container'>
					<Stack spacing={4.5} className='Chart-Stack'>
						<div className='chart-Emocion'>
							<EmotionsLineChartCentered />
						</div>
						<div className='chart-Expenses'>
							<ExpensesLineChart />
						</div>
					</Stack>
					<div className='Analytics-cards'>
						<Stack spacing={5}>
							<GoalProgressCard spent={150000} total={200000} />
						</Stack>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Analytics;
