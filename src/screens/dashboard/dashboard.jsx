import './style.css';
import AddButton from '../../components/Buttons/add';

import Header from '../../components/Header/header';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';
import EmotionWeek from '../../components/Cards/emotionWeek';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FeelingsCard from '../../components/Cards/FeelingsCard';
import Menu from '../../components/Menu/menu';
import MobileNavBar from '../../components/Menu/mobileNavBar';
import ExpensesTable from '../../components/Tables/expensesTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJournal, getUserData } from '../../services/firebaseUtils';
import { getEmotionSpendingStats } from '../../services/analysisUtils';
import { setUserName } from '../../redux/UserSlice/NameSlice';

function Dashboard() {
	const [Data, setData] = useState();
	const [Loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
	const [emotionStats, setEmotionStats] = useState(null);

	const id = useSelector((state) => state.userId.id);
	const userName = useSelector((state) => state.userName.name);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			fetchJournal({ uid: id })
				.then((Emotion) => setData([...Emotion]))
				.finally(() => setLoading(false));

			getEmotionSpendingStats(id).then(setEmotionStats);

			getUserData(id).then((data) => {
				if (data?.name) dispatch(setUserName(data.name));
			});
		}

		const handleResize = () => {
			setIsMobile(window.innerWidth <= 767);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [id, dispatch]);

	const goLogin = () => navigate('/log');
	const handleJournalClick = () => navigate('/journal/write', { state: { redirectTo: '/dashboard' } });
	const handleSpendClick = () => navigate('/finance/add-spending', { state: { from: '/dashboard' } });
	const goSettings = () => navigate('/settings');

	return (
		<div className='dashboard-container' role='main' aria-label='Main dashboard panel'>
			{!isMobile && <Menu role='navigation' aria-label='main menu' />}
			<div className='dashboard-content'>
				<div className='dashboard-header'>
					<Header
						Nombre={userName || '...'}
						subtitle='How are you feeling today?'
						role='banner'
						aria-label='Header with user name and subtitle'
					/>
					{!isMobile && (
						<div className='dashboard-icons' role='toolbar' aria-label='user actions'>
							<CustomIconButton
								icon={<AccountCircleIcon />}
								ariaLabel='settings and user profile'
								onClick={goSettings}
							/>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='log-out' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='dashboard-buttons' role='group' aria-label='action buttons'>
					<AddButton onClick={handleJournalClick} text={'Add journal'} aria-label='add new journal entry' />
					<AddButton onClick={handleSpendClick} text={'Add spend'} aria-label='add new spend' />
				</div>

				<div className='dashboard-cards-row' role='region' aria-label='cards with important information'>
					{isMobile ? (
						<div className='dashboard-scroll-cards' role='group' aria-label='cards'>
							<ReminderCard aria-label='cards remainder' />
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
					) : (
						<>
							<ReminderCard aria-label='Cards remainder' />
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
							<GoalProgressCard aria-label='card' />
						</>
					)}
				</div>

				{isMobile && (
					<div className='goal-container' role='region' aria-label='goal progress card'>
						<GoalProgressCard aria-label='progress card' />
					</div>
				)}

				<div className='dashboard-bottom-row' role='region' aria-label='deta display area'>
					<div className='expenses-container' role='region' aria-label='table with recent expenses'>
						<ExpensesTable dashboard={true} aria-label='table with recent expenses' />
					</div>

					{Loading ? (
						<p role='status' aria-live='polite' aria-label='loadin'>
							Loading
						</p>
					) : (
						<div className='emotion-container' role='region' aria-label='analysis of emotions over the week'>
							<EmotionWeek dashboard={true} Data={Data} aria-label='graph analysis' />
						</div>
					)}
				</div>
			</div>
			{isMobile && <MobileNavBar role='navigation' aria-label='navigation bar' />}

			{window.innerWidth <= 1024 && <MobileNavBar role='navigation' aria-label='navgation bar' />}
		</div>
	);
}

export default Dashboard;
