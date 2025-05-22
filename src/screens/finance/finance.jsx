import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu/menu';
import AddButton from '../../components/Buttons/addbutton';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import GoalStatsCard from '../../components/Cards/goalStatsCard ';
import GoalHistoryTable from '../../components/Tables/goalHistoryTable';
import GoalProgressCard from '../../components/Cards/goal';
import ExpenditureHistoryTable from '../../components/Tables/expenditureHistoryTable';
import MobileNavBar from '../../components/Menu/mobileNavBar'; // Importamos la barra de navegación móvil
import { goalsSummary } from '../../Data/goalData';
import './finance.css';

function Finance() {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
	const [showButtons, setShowButtons] = useState(true);

	useEffect(() => {
		// Función para actualizar el estado de isMobile cuando cambia el tamaño de la ventana
		const handleResize = () => {
			const mobile = window.innerWidth <= 1024;
			setIsMobile(mobile);
			setShowButtons(!mobile); // Siempre mostrar botones en desktop
		};

		// Llamar handleResize una vez para inicializar correctamente
		handleResize();

		// Agregar event listener para el cambio de tamaño
		window.addEventListener('resize', handleResize);

		// Definir un punto de entrada para el observador de intersección
		const handleIntersection = (entries) => {
			// Si la navbar está visible (intersecting), ocultar los botones
			if (entries[0].isIntersecting) {
				setShowButtons(false);
			} else {
				// Si estamos en móvil pero la navbar no es visible, mostrar los botones
				setShowButtons(isMobile);
			}
		};

		// Crear un observador para la barra de navegación móvil
		if (isMobile) {
			const navbarElement = document.querySelector('.mobile-navbar');
			if (navbarElement) {
				const observer = new IntersectionObserver(handleIntersection, {
					threshold: 0.1, // Disparar cuando al menos el 10% de la navbar es visible
				});
				observer.observe(navbarElement);

				// Limpiar observador
				return () => {
					observer.disconnect();
				};
			}
		}

		// Limpiar event listener cuando el componente se desmonta
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);

	const goLogin = () => {
		navigate('/log');
	};

	const goSettings = () => {
		navigate('/settings');
	};

	const handleSpendClick = () => {
		navigate('/finance/add-spending');
	};

	const handleGoalClick = () => {
		navigate('/finance/add-goal');
	};

	return (
		<div className='finance-container'>
			{/* Mostrar el menú lateral solo en pantallas grandes */}
			{!isMobile && <Menu />}

			<div className='finance-content'>
				{/* Mobile/iPad icons above header - solo mostrar si showButtons es true */}
				{isMobile && showButtons && (
					<div className='finance-mobile-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				)}

				<div className='finance-header'>
					<Header2 title='Finance' subtitle='Here you will find your stats.' />
					{/* Desktop icons - only show on non-mobile */}
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

			{/* Mostrar la barra de navegación móvil solo en pantallas pequeñas y medianas */}
			{isMobile && <MobileNavBar />}
		</div>
	);
}

export default Finance;
