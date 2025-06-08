import './recommendations.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuario } from '../../utils/utils';
import { getRecommendation } from '../../services/openaiService';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header2 from '../../components/Header/header2';
import CustomIconButton from '../../components/Buttons/icon';
import Menu from '../../components/Menu/menu';
import CategoryMenu from '../../components/Filters/categoryMenu';
import RecommendationCard from '../../components/Cards/recommendationCard';
import MobileNavBar from '../../components/Menu/mobileNavBar';

function Recommendations() {
	let navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState('');
	const [recommendation, setRecommendation] = useState('');
	const [loading, setLoading] = useState(false);
	const [showInfo, setShowInfo] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

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
			{!isMobile && <Menu />}

			<div className='recommendations-content'>
				<div className='recommendations-header'>
					<Header2 title='For you' subtitle='Recommendation for you' />
					{!isMobile && (
						<div className='recommendations-icons'>
							<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
							<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
						</div>
					)}
				</div>
				<div className='recommendations-categories'>
					<CategoryMenu
						categories={categories}
						selectedCategory={selectedCategory}
						onCategoryClick={handleCategoryClick}
					/>
				</div>
				<RecommendationCard
					showInfo={showInfo}
					selectedCategory={selectedCategory}
					recommendation={recommendation}
					loading={loading}
					onRefresh={handleRefresh}
				/>
			</div>
			{isMobile && <MobileNavBar className='mobile-navbar' />}
		</div>
	);
}
export default Recommendations;
