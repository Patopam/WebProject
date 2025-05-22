import React, { useEffect, useState } from 'react';
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

function Analytics() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [showButtons, setShowButtons] = useState(true);
	let navigate = useNavigate();
	const goLogin = () => navigate('/log');
	const goSettings = () => navigate('/settings');

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 1024;
			setIsMobile(mobile);
			setShowButtons(!mobile);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		const handleIntersection = (entries) => {
			if (entries[0].isIntersecting) {
				setShowButtons(false);
			} else {
				setShowButtons(isMobile);
			}
		};

		if (isMobile) {
			const navbarElement = document.querySelector('.mobile-navbar');
			if (navbarElement) {
				const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
				observer.observe(navbarElement);
				return () => observer.disconnect();
			}
		}

		return () => window.removeEventListener('resize', handleResize);
	}, [isMobile]);

	return (
		<div className='analytics-container'>
			{!isMobile && <Menu />}
			<div className='analytics-content'>
				{/* Íconos móviles arriba del header */}
				{isMobile && showButtons && (
					<div className='analytics-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}
				<div className='analytics-header'>
					<Header2 title='Analytics' subtitle='Set goals and look at your track record.' />
					{!isMobile && (
						<div className='analytics-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
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
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Analytics;
