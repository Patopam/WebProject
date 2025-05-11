import React from 'react';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import FeelingsCard from '../../components/Cards/FeelingsCard';
import GoalProgressCard from '../../components/Cards/goal';
import EmotionsLineChartCentered from '../../components/Charts/ChartsEmociones';
import ExpensesLineChart from '../../components/Charts/ChartsGastos';
import './analytics.css';
import { useNavigate } from 'react-router-dom';

function Analytics() {
	let navigate = useNavigate();
	const goLogin = () => {
		navigate('/log');
	};
	const goSettings = () => {
		navigate('/settings');
	};

	return (
		<div className='analytics-container'>
			<Menu />
			<div className='analytics-content'>
				<div className='analytics-header'>
					<Header2 title='Analytics' subtitle='Set goals and look at your track record.' />
					<div className='analytics-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>

				<div className='main-layout'>
					<div className='charts-section'>
						<div className='chart-container'>
							<div className='chart-Emocion'>
								<EmotionsLineChartCentered />
							</div>
							<div className='chart-Expenses'>
								<ExpensesLineChart />
							</div>
						</div>
					</div>

					<div className='cards-section'>
						<div className='card-item'>
							<FeelingsCard />
						</div>
						<div className='card-item'>
							<GoalProgressCard />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Analytics;
