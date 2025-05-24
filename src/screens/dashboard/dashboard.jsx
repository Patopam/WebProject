import AddButton from '../../components/Buttons/addButton';
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
import expensesData from '../../Data/expensesData';
import './style.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchJournal } from '../../services/firebaseUtils';

function Dashboard() {
	const [Data, setData] = useState();
	const [Loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [showButtons, setShowButtons] = useState(true);

	const id = useSelector((state) => state.userId.id);
	const NombreU = useSelector((state) => state.NombreU.Nombre);
	useEffect(() => {
		fetchJournal({ uid: id })
			.then((Emotion) => setData([...Emotion]))
			.finally(() => setLoading(false));

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
				const observer = new IntersectionObserver(handleIntersection, {
					threshold: 0.1,
				});
				observer.observe(navbarElement);

				// Limpiar observador
				return () => {
					observer.disconnect();
				};
			}
		}

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);

	let navigate = useNavigate();
	const goLogin = () => {
		navigate('/log');
	};

	const handleJournalClick = () => {
		console.log('Daily journal clicked');
		navigate('/journal/write');
	};

	const handleSpendClick = () => {
		console.log('Add spend clicked');
		navigate('/finance/add-spending');
	};
	const goSettings = () => {
		navigate('/settings');
	};

	return (
		<div className='dashboard-container'>
			{!isMobile && <Menu />}

			<div className='dashboard-content'>
				{isMobile && showButtons && (
					<div className='dashboard-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}

				<div className='dashboard-header'>
					<Header Nombre={NombreU} subtitle='How are you feeling today?' />

					{!isMobile && (
						<div className='dashboard-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='dashboard-buttons'>
					<AddButton onClick={handleJournalClick} text={'Daily journal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				<div className='dashboard-cards-row'>
					<ReminderCard />
					<FeelingsCard />
					<GoalProgressCard />
				</div>

				<div className='dashboard-bottom-row'>
					<div className='expenses-container'>
						<ExpensesTable data={expensesData} dashboard={true} />
					</div>

					{Loading ? (
						<p> Loading</p>
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
