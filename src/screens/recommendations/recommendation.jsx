import React, { useState, useEffect } from 'react';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '../../components/Menu/menu';
import './recommendations.css';
import { obtenerUsuario } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryMenu from '../../components/Filters/categoryMenu';
import RecommendationCard from '../../components/Cards/recommendationCard';

// Import the AI service
import { getRecommendation } from '../../services/aiService';

function Recommendations() {
	const id = useSelector((state) => state.userId.id);
	let navigate = useNavigate();

	const [selectedCategory, setSelectedCategory] = useState('');
	const [recommendation, setRecommendation] = useState('');
	const [loading, setLoading] = useState(false);
	const [showInfo, setShowInfo] = useState(true);

	const categories = [
		'Breathing exercise',
		'Yoga class',
		'Healthy habits',
		'Money mindset',
		'Self-care tip',
		'Gratitude practice',
	];

	const goLogin = () => {
		navigate('/log');
	};

	const goSettings = () => {
		navigate('/settings');
	};

	const [Nombre, setNombre] = useState('Evan');
	useEffect(() => {
		setNombre(obtenerUsuario());
	}, []);

	const handleCategoryClick = async (category) => {
		setSelectedCategory(category);
		setLoading(true);
		setShowInfo(false);

		try {
			const newRecommendation = await getRecommendation(category);
			setRecommendation(newRecommendation);
		} catch (error) {
			console.error('Error fetching recommendation:', error);
			setRecommendation("Sorry, we couldn't generate a recommendation right now. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleRefresh = async () => {
		if (!loading && selectedCategory) {
			setLoading(true);
			try {
				const newRecommendation = await getRecommendation(selectedCategory);
				setRecommendation(newRecommendation);
			} catch (error) {
				console.error('Error refreshing recommendation:', error);
				setRecommendation("Sorry, we couldn't generate a new recommendation right now. Please try again.");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className='recommendations-container'>
			<Menu />
			<div className='recommendations-content'>
				<div className='recommendations-header'>
					<Header2 title='Recommendations' subtitle='Recommendation for you' />
					<div className='recommendations-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>

				{/* Category menu component */}
				<CategoryMenu
					categories={categories}
					selectedCategory={selectedCategory}
					onCategoryClick={handleCategoryClick}
				/>

				{/* Recommendation card component */}
				<RecommendationCard
					showInfo={showInfo}
					selectedCategory={selectedCategory}
					recommendation={recommendation}
					loading={loading}
					onRefresh={handleRefresh}
				/>
			</div>
		</div>
	);
}

export default Recommendations;
