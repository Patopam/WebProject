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
		<div className='analytics-container' role='main' aria-label='Página de análisis y estadísticas personales'>
			{!isMobile && <Menu role='navigation' aria-label='Menú principal de navegación' />}
			<div className='analytics-content'>
				<div className='analytics-header'>
					<Header2
						title='Analytics'
						subtitle='Set goals and look at your track record.'
						role='banner'
						aria-label='Encabezado de la sección de análisis'
					/>
					{!isMobile && (
						<div className='analytics-icons' role='toolbar' aria-label='Herramientas de usuario'>
							<CustomIconButton
								icon={<AccountCircleIcon />}
								ariaLabel='Ir a configuración del perfil de usuario'
								onClick={goSettings}
							/>
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='Cerrar sesión y regresar al login' onClick={goLogin} />
						</div>
					)}
				</div>

				<div className='main-layout' role='region' aria-label='Panel principal de análisis de datos'>
					<div className='charts-section' role='region' aria-label='Sección de gráficos y visualizaciones'>
						<div className='chart-container' role='group' aria-label='Contenedor de gráficos analíticos'>
							<div
								className='chart-Emocion'
								role='img'
								aria-label='Gráfico de análisis emocional a lo largo del tiempo'
							>
								<EmotionsLineChartCentered aria-label='Gráfico de línea que muestra la evolución de las emociones registradas' />
							</div>
							<div className='chart-Expenses' role='img' aria-label='Gráfico de análisis de gastos financieros'>
								<ExpensesLineChart aria-label='Gráfico de línea que muestra la evolución de los gastos a lo largo del tiempo' />
							</div>
						</div>
					</div>
					<div className='cards-section' role='complementary' aria-label='Panel de resumen con tarjetas informativas'>
						<div className='card-item' role='region' aria-label='Tarjeta de estado emocional'>
							{emotionStats ? (
								<FeelingsCard
									emotion={emotionStats.emotion}
									percentage={emotionStats.percentage}
									aria-label={`Resumen emocional: ${emotionStats.emotion} es tu emoción predominante con ${emotionStats.percentage}% de frecuencia`}
								/>
							) : (
								<FeelingsCard
									emotion='none'
									percentage={0}
									aria-label='Resumen emocional: sin datos disponibles para mostrar'
								/>
							)}
						</div>
						<div className='card-item' role='region' aria-label='Tarjeta de progreso de metas'>
							<GoalProgressCard aria-label='Tarjeta mostrando el progreso actual de tus metas financieras establecidas' />
						</div>
					</div>
				</div>
			</div>
			{isMobile && <MobileNavBar role='navigation' aria-label='Barra de navegación móvil' />}
		</div>
	);
}

export default Analytics;
