import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from '../../components/Menu/menu';
import AddButton from '../../components/Buttons/add';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import GoalStatsCard from '../../components/Cards/goalStatsCard ';
import GoalHistoryTable from '../../components/Tables/goalHistoryTable';
import GoalProgressCard from '../../components/Cards/goal';
import ExpenditureHistoryTable from '../../components/Tables/expenditureHistoryTable';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import { evaluateGoalsStatus, getCompletedGoals, getFailedGoals } from '../../services/firebaseUtils';
import './finance.css';

function Finance() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
	const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
	const uid = useSelector((state) => state.userId.id);
	const [completedCount, setCompletedCount] = useState(0);
	const [failedCount, setFailedCount] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsMobile(width <= 768);
			setIsSmallMobile(width <= 480);
			setIsTablet(width > 768 && width <= 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (!uid) return;

		evaluateGoalsStatus({ uid }).then(() => {
			getCompletedGoals({ uid }).then((goals) => setCompletedCount(goals.length));
			getFailedGoals({ uid }).then((goals) => setFailedCount(goals.length));
		});
	}, [uid, location]);

	const goLogin = () => navigate('/log');
	const goSettings = () => navigate('/settings');
	const handleSpendClick = () => {
		navigate('/finance/add-spending', { state: { from: '/finance' } });
	};

	const handleGoalClick = () => {
		navigate('/finance/add-goal');
	};

	const renderStatsCards = () => (
		<>
			<GoalStatsCard
				title='Goals completed'
				description='You have successfully completed a total of'
				quantity={completedCount}
				label='goals'
				bgColor='#C7DDF9'
				iconBg='#85A9E8'
			/>
			<GoalStatsCard
				title='Goals failed'
				description='You have failed a total of'
				quantity={failedCount}
				label='goals'
				bgColor='#F7C8B6'
				iconBg='#E68067'
			/>
		</>
	);

	return (
		<div className='finance-container'>
			{!isMobile && !isTablet && <Menu />}
			<div className='finance-content'>
				<div className='finance-header'>
					<Header2 title='Finance' subtitle='Here you will find your stats.' />
					{!isMobile && !isTablet && (
						<div className='finance-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='finance-buttons'>
					<AddButton onClick={handleGoalClick} text={'Set new goal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				<div className='finance-layout'>
					<div className='finance-main'>
						<div className='finance-left-column'>
							{isSmallMobile && (
								<div className='finance-scroll-cards'>
									<div className='finance-card'>
										<GoalProgressCard />
									</div>
									<div className='finance-card'>
										<GoalStatsCard
											title='Goals completed'
											description='You have successfully completed a total of'
											quantity={completedCount}
											label='goals'
											bgColor='#C7DDF9'
											iconBg='#85A9E8'
										/>
									</div>
									<div className='finance-card'>
										<GoalStatsCard
											title='Goals failed'
											description='You have failed a total of'
											quantity={failedCount}
											label='goals'
											bgColor='#F7C8B6'
											iconBg='#E68067'
										/>
									</div>
								</div>
							)}

							{isMobile && !isSmallMobile && (
								<div className='finance-cards-section'>
									<div className='finance-goal-progress'>
										<GoalProgressCard />
									</div>
									<div className='finance-stats-mobile'>{renderStatsCards()}</div>
								</div>
							)}

							<GoalHistoryTable />
							<ExpenditureHistoryTable />
						</div>

						{!isMobile && (
							<div className='finance-right-column'>
								<div className='goal-progress-placeholder'>
									<GoalProgressCard />
								</div>

								<div className='stats-cards'>{renderStatsCards()}</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{(isMobile || isTablet) && <MobileNavBar />}
		</div>
	);
}

export default Finance;
