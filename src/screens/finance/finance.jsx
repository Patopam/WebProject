import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu/menu';
import AddButton from '../../components/Buttons/add';
import Header from '../../components/Header/header';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import GoalStatsCard from '../../components/Cards/goalStatsCard ';
import GoalHistoryTable from '../../components/Tables/goalHistoryTable';
import GoalProgressCard from '../../components/Cards/goal';
import ExpenditureHistoryTable from '../../components/Tables/expenditureHistoryTable';
import { goalsSummary } from '../../Data/goalData';
import { expenditureData } from '../../Data/expensesData';
import { goalHistoryData } from '../../Data/goalData';
import './finance.css';

function Finance() {
	const navigate = useNavigate();

	const handleSpendClick = () => {
		navigate('/finance/add-spending');
	};

	const handleGoalClick = () => {
		navigate('/finance/add-goal');
	};
	return (
		<div className='finance-container'>
			<Menu />
			<div className='finance-content'>
				<div className='finance-header'>
					<Header title='Finance' subtitle='Here you will find your stats.' />
					<div className='finance-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' />
					</div>
				</div>
				<div className='finance-buttons'>
					<AddButton onClick={handleGoalClick} text={'Set new goal'} />
					<AddButton onClick={handleSpendClick} text={'Add spend'} />
				</div>

				{/* esqueleto de la pagina */}
				<div className='finance-layout'>
					{/* Botones superiores (Set new goal y Add spending) */}
					<div className='finance-top'>{/* Aquí irán los botones luego */}</div>

					{/* Distribución de columnas */}
					<div className='finance-main'>
						{/* Columna izquierda */}
						<div className='finance-left-column'>
							{/* Aquí luego se insertarán los componentes  */}
							<GoalHistoryTable data={goalHistoryData} />
							<ExpenditureHistoryTable data={expenditureData} />
						</div>

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
