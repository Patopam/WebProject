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
		<div className='dashboard-container'>
			{!isMobile && <Menu />}
			<div className='dashboard-content'>
				<div className='dashboard-header'>
					<Header Nombre={userName || '...'} subtitle='How are you feeling today?' />
					{!isMobile && (
						<div className='dashboard-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='dashboard-buttons'>
					<AddButton onClick={handleJournalClick} text={'Add journal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				<div className='dashboard-cards-row'>
					{isMobile ? (
						<div className='dashboard-scroll-cards'>
							<ReminderCard />
							{emotionStats ? (
								<FeelingsCard emotion={emotionStats.emotion} percentage={emotionStats.percentage} />
							) : (
								<FeelingsCard emotion='none' percentage={0} />
							)}
						</div>
					) : (
						<>
							<ReminderCard />
							{emotionStats ? (
								<FeelingsCard emotion={emotionStats.emotion} percentage={emotionStats.percentage} />
							) : (
								<FeelingsCard emotion='none' percentage={0} />
							)}
							<GoalProgressCard />
						</>
					)}
				</div>

				{isMobile && (
					<div className='goal-container'>
						<GoalProgressCard />
					</div>
				)}

				<div className='dashboard-bottom-row'>
					<div className='expenses-container'>
						<ExpensesTable dashboard={true} />
					</div>

					{Loading ? (
						<p>Loading</p>
					) : (
						<div className='emotion-container'>
							<EmotionWeek dashboard={true} Data={Data} />
						</div>
					)}
				</div>
			</div>
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Dashboard;
