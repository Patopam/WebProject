import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { goalsSummary } from '../../Data/goalData';
import './finance.css';

function Finance() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const goLogin = () => navigate('/log');
	const goSettings = () => navigate('/settings');
	const handleSpendClick = () => {
		navigate('/finance/add-spending', { state: { from: '/finance' } });
	};

	const handleGoalClick = () => {
		navigate('/finance/add-goal');
	};

	return (
		<div className='finance-container'>
			{!isMobile && <Menu />}
			<div className='finance-content'>
				<div className='finance-header'>
					<Header2 title='Finance' subtitle='Here you will find your stats.' />
					{!isMobile && (
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
							<GoalHistoryTable />
							<ExpenditureHistoryTable />
						</div>

						<div className='finance-right-column'>
							<div className='goal-progress-placeholder'>
								<GoalProgressCard spent={150000} total={200000} />
							</div>

							<div className='stats-cards'>
								{goalsSummary.map((goal, index) => (
									<GoalStatsCard
										key={index}
										title={goal.title}
										description={goal.description}
										quantity={goal.quantity}
										label={goal.label}
										bgColor={goal.bgColor}
										iconBg={goal.iconBg}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Finance;
