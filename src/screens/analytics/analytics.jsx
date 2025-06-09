import { useEffect, useState } from 'react';
import Menu from '../../components/Menu/menu';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import FeelingsCard from '../../components/Cards/FeelingsCard';
import GoalProgressCard from '../../components/Cards/goal';
import EmotionsLineChartCentered from '../../components/Charts/emotionChart';
import ExpensesLineChart from '../../components/Charts/expenseChart';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import './analytics.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEmotionSpendingStats } from '../../services/analysisUtils';

function Analytics() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [emotionStats, setEmotionStats] = useState(null);

	const uid = useSelector((state) => state.userId.id);
	const navigate = useNavigate();

	const goLogin = () => navigate('/log');
	const goSettings = () => navigate('/settings');

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (uid) {
			getEmotionSpendingStats(uid).then(setEmotionStats);
		}
	}, [uid]);

	return (
		<div className='analytics-container' role='main' aria-label='page data analytics'>
			{!isMobile && <Menu role='navigation' aria-label='menu' />}
			<div className='analytics-content'>
				<div className='analytics-header'>
					<Header2
						title='Analytics'
						subtitle='Set goals and look at your track record.'
						role='banner'
						aria-label='header with title and subtitle'
					/>
					{!isMobile && (
						<div className='analytics-icons' role='toolbar' aria-label='section with user actions'>
							<CustomIconButton
								icon={<AccountCircleIcon />}
								ariaLabel='configurations and user settings'
								onClick={goSettings}
							/>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='log-out' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='main-layout' role='region' aria-label='data analytics main content area'>
					<div className='charts-section' role='region' aria-label='graphical data representation'>
						<div className='chart-container' role='group' aria-label='graphs and charts'>
							<div className='chart-Emocion' role='img' aria-label='emotion analysis chart'>
								<EmotionsLineChartCentered aria-label='line graph analysis' />
							</div>
							<div className='chart-Expenses' role='img' aria-label='graph showing expenses over time'>
								<ExpensesLineChart aria-label='graph showeing expenses' />
							</div>
						</div>
					</div>
					<div className='cards-section' role='complementary' aria-label='resume cards with key information'>
						<div className='card-item' role='region' aria-label='card with emotional summary'>
							{emotionStats ? (
								<FeelingsCard
									emotion={emotionStats.emotion}
									percentage={emotionStats.percentage}
									aria-label={`emotional resume: ${emotionStats.emotion} is your emotion ${emotionStats.percentage}% of frecuency`}
								/>
							) : (
								<FeelingsCard
									emotion='none'
									percentage={0}
									aria-label='resume of emotions not available yet, please wait'
								/>
							)}
						</div>
						<div className='card-item' role='region' aria-label='progress card with financial goals'>
							<GoalProgressCard aria-label='goals' />
						</div>
					</div>
				</div>
			</div>
			{isMobile && <MobileNavBar role='navigation' aria-label='navigation bar' />}
		</div>
	);
}

export default Analytics;
