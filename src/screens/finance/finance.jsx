import React from 'react';
import Menu from '../../components/Menu/menu';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import GoalStatsCard from '../../components/Cards/goalStatsCard ';
import './finance.css';
import { goalsSummary } from '../../Data/goalData';
import GoalProgressCard from '../../components/Cards/goal';

function Finance() {
	return (
		<div className='finance-container'>
			<Menu />
			<div className='finance-content'>
				{/* Header con título y botones de perfil */}
				<div className='finance-header'>
					<Header title='Finance' subtitle='Here you will find your stats.' />
					<div className='finance-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>

				{/* esqueleto de la pagina */}
				<div className='finance-layout'>
					{/* Botones superiores (Set new goal y Add spending) */}
					<div className='finance-top'>{/* Aquí irán los botones luego */}</div>

					{/* Distribución de columnas */}
					<div className='finance-main'>
						{/* Columna izquierda */}
						<div className='finance-left-column'>{/* Aquí luego se insertarán los componentes  */}</div>

						{/* Columna derecha */}
						<div className='finance-right-column'>
							<div className='goal-progress-placeholder'>
								<GoalProgressCard spent={150000} total={200000} compact={true} />
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
		</div>
	);
}

export default Finance;
