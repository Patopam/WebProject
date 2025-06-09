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
		<div className='dashboard-container' role='main' aria-label='Panel de control principal'>
			{!isMobile && <Menu role='navigation' aria-label='Menú principal' />}
			<div className='dashboard-content'>
				<div className='dashboard-header'>
					<Header
						Nombre={userName || '...'}
						subtitle='How are you feeling today?'
						role='banner'
						aria-label='Encabezado del dashboard'
					/>
					{!isMobile && (
						<div className='dashboard-icons' role='toolbar' aria-label='Herramientas de usuario'>
							<CustomIconButton
								icon={<AccountCircleIcon />}
								ariaLabel='Ir a configuración de perfil de usuario'
								onClick={goSettings}
							/>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='Cerrar sesión y volver al inicio' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='dashboard-buttons' role='group' aria-label='Botones de acciones principales'>
					<AddButton
						onClick={handleJournalClick}
						text={'Add journal'}
						aria-label='Agregar nueva entrada al diario emocional'
					/>
					<AddButton onClick={handleSpendClick} text={'Add spend'} aria-label='Registrar nuevo gasto financiero' />
				</div>

				<div className='dashboard-cards-row' role='region' aria-label='Tarjetas de resumen'>
					{isMobile ? (
						<div className='dashboard-scroll-cards' role='group' aria-label='Tarjetas deslizables'>
							<ReminderCard aria-label='Tarjeta de recordatorios' />
							{emotionStats ? (
								<FeelingsCard
									emotion={emotionStats.emotion}
									percentage={emotionStats.percentage}
									aria-label={`Estado emocional actual: ${emotionStats.emotion} con ${emotionStats.percentage}% de frecuencia`}
								/>
							) : (
								<FeelingsCard emotion='none' percentage={0} aria-label='Estado emocional: sin datos disponibles' />
							)}
						</div>
					) : (
						<>
							<ReminderCard aria-label='Tarjeta de recordatorios diarios' />
							{emotionStats ? (
								<FeelingsCard
									emotion={emotionStats.emotion}
									percentage={emotionStats.percentage}
									aria-label={`Estado emocional predominante: ${emotionStats.emotion} con ${emotionStats.percentage}% de frecuencia`}
								/>
							) : (
								<FeelingsCard
									emotion='none'
									percentage={0}
									aria-label='Estado emocional: sin datos disponibles para mostrar'
								/>
							)}
							<GoalProgressCard aria-label='Tarjeta de progreso de metas financieras' />
						</>
					)}
				</div>

				{isMobile && (
					<div className='goal-container' role='region' aria-label='Progreso de metas'>
						<GoalProgressCard aria-label='Progreso de metas financieras personales' />
					</div>
				)}

				<div className='dashboard-bottom-row' role='region' aria-label='Datos detallados'>
					<div className='expenses-container' role='region' aria-label='Tabla de gastos'>
						<ExpensesTable dashboard={true} aria-label='Tabla con el resumen de gastos recientes' />
					</div>

					{Loading ? (
						<p role='status' aria-live='polite' aria-label='Cargando datos emocionales'>
							Loading
						</p>
					) : (
						<div className='emotion-container' role='region' aria-label='Análisis emocional semanal'>
							<EmotionWeek dashboard={true} Data={Data} aria-label='Gráfico del análisis emocional de la semana' />
						</div>
					)}
				</div>
			</div>
			{isMobile && <MobileNavBar role='navigation' aria-label='Barra de navegación móvil' />}

			{window.innerWidth <= 1024 && <MobileNavBar role='navigation' aria-label='Barra de navegación para tablet' />}
		</div>
	);
}

export default Dashboard;
