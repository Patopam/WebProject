import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import MoodTracker from '../../components/Tables/mood';
import Menu from '../../components/Menu/menu';
import ReminderCard from '../../components/Cards/remainder';
import RecommendationDay from '../../components/Cards/recommendationDay';
import Header2 from '../../components/Header/header2';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomIconButton from '../../components/Buttons/icon';
import './emotions.css';
import { useNavigate } from 'react-router-dom';

function Emotions() {
	const [ultimaEmocion, setUltimaEmocion] = useState('');
	const uid = useSelector((state) => state.userId.id);
	let navigate = useNavigate();

	useEffect(() => {
		if (!uid) return;

		const fetchLastEmotion = async () => {
			try {
				const journalsRef = collection(db, `users/${uid}/journals`);
				const q = query(journalsRef, orderBy('date', 'desc'), limit(1));
				const querySnapshot = await getDocs(q);

				if (!querySnapshot.empty) {
					const data = querySnapshot.docs[0].data();
					const traducciones = {
						feliz: 'happy',
						triste: 'sad',
						enojado: 'angry',
						estresado: 'stressed',
						confundido: 'confused',
						ansioso: 'anxious',
					};
					const emocionOriginal = data.emotion?.toLowerCase?.() || '';
					const emocionTraducida = traducciones[emocionOriginal] || emocionOriginal || 'neutral';
					setUltimaEmocion(emocionTraducida);
				}
			} catch (error) {
				console.error('Error fetching last emotion:', error);
			}
		};

		fetchLastEmotion();
	}, [uid]);

	const goLogin = () => {
		navigate('/log');
	};

	const goSettings = () => {
		navigate('/settings');
	};

	return (
		<div className='emotions-container'>
			<Menu />
			<div className='emotions-content'>
				<div className='emotions-header'>
					<Header2 title='My emotions' subtitle='Look at your history of your emotions.' />
					<div className='emotions-icons'>
						<CustomIconButton icon={<AccountCircleIcon />} ariaLabel='user' onClick={goSettings} />
						<CustomIconButton icon={<LogoutIcon />} ariaLabel='logout' onClick={goLogin} />
					</div>
				</div>

				<div className='emotions-main-grid'>
					<div className='emotions-left'>
						<MoodTracker />
					</div>
					<div className='emotions-right'>
						<ReminderCard />
						{ultimaEmocion && <RecommendationDay emotion={ultimaEmocion} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Emotions;
