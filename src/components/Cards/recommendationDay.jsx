import { useState, useEffect } from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { getRecommendationFromEmotion } from '../../services/openaiService';
import { getImageFromKeyword } from '../../services/pexelsService';
import { useDispatch, useSelector } from 'react-redux';
import { setAiLoading } from '../../redux/aiStatusSlice';
// ... (imports siguen igual)

const RecommendationDay = ({ emotion }) => {
	const [recommendation, setRecommendation] = useState(null);
	const [localLoading, setLocalLoading] = useState(false);
	const dispatch = useDispatch();
	const loadingAI = useSelector((state) => state.aiStatus.loading);
	const today = new Date().toISOString().split('T')[0];

	useEffect(() => {
		const saved = localStorage.getItem('dailyRecommendation');
		if (saved) {
			const parsed = JSON.parse(saved);
			if (parsed.date === today && parsed.emotion === emotion) {
				setRecommendation(parsed.data);
			}
		}
	}, [emotion, today]);

	const handleGetRecommendation = async () => {
		if (!emotion || loadingAI || localLoading) return;
		setLocalLoading(true);
		dispatch(setAiLoading(true));
		try {
			const aiData = await getRecommendationFromEmotion(emotion);
			const image = await getImageFromKeyword(aiData.imageKeyword);
			const finalData = {
				intro: aiData.intro,
				title: aiData.title,
				description: aiData.description,
				imageUrl: image,
			};
			localStorage.setItem(
				'dailyRecommendation',
				JSON.stringify({
					date: today,
					emotion,
					data: finalData,
				})
			);
			setRecommendation(finalData);
		} catch (error) {
			console.error('Error loading recommendation:', error);
		} finally {
			setLocalLoading(false);
			dispatch(setAiLoading(false));
		}
	};

	return (
		<CardContainer>
			<SectionTitle>
				<IconCircle>
					<LightbulbOutlinedIcon sx={{ color: '#333', fontSize: '1.125rem' }} />
				</IconCircle>
				<Typography
					sx={{
						fontFamily: "'Manrope', sans-serif",
						fontSize: '1rem',
						fontWeight: 400,
						color: '#333',
					}}
				>
					Recommendation of the day
				</Typography>
			</SectionTitle>

			{recommendation && (
				<SectionEmotion>
					<Typography sx={{ fontSize: '1.14rem', color: '#333', lineHeight: 1.3 }}>{recommendation.intro}</Typography>
				</SectionEmotion>
			)}

			{!recommendation ? (
				<Button
					variant='contained'
					onClick={handleGetRecommendation}
					disabled={loadingAI || localLoading}
					sx={{
						backgroundColor: '#F69F77',
						color: '#333',
						textTransform: 'none',
						fontWeight: 'bold',
						fontFamily: "'Manrope', sans-serif",
						alignSelf: 'start',
						borderRadius: '9px',
						boxShadow: '0px 3px 8px rgba(80, 80, 80, 0.08)',
						paddingX: '1.2rem',
						paddingY: '0.5rem',
						fontSize: '0.85rem',
						'&:hover': {
							backgroundColor: '#E49B79',
							boxShadow: '0px 3px 10px rgba(101, 101, 101, 0.08)',
						},
					}}
				>
					{localLoading ? 'Loading...' : 'Find out what we have for you'}
				</Button>
			) : (
				<SectionRecommendation>
					<LeftText>
						<Typography
							sx={{
								fontWeight: 600,
								fontSize: '1.12rem',
								marginBottom: '0.8rem',
								lineHeight: 1.2,
							}}
						>
							{recommendation.title}
						</Typography>
						<Typography
							sx={{
								fontSize: '1.1rem',
								color: '#333',
								lineHeight: 1.3,
								fontWeight: 400,
							}}
						>
							{recommendation.description}
						</Typography>
					</LeftText>
					<ImageBox>
						{recommendation.imageUrl && <img src={recommendation.imageUrl} alt={recommendation.title} />}
					</ImageBox>
				</SectionRecommendation>
			)}
		</CardContainer>
	);
};

export default RecommendationDay;

const CardContainer = styled(Box)(() => ({
	backgroundColor: '#fdd1bc',
	padding: '1.7rem',
	borderRadius: '1.5rem',
	fontFamily: '"Manrope", sans-serif',
	width: '100%',
	maxWidth: '75rem',
	margin: '0 auto',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	gap: '1.35rem',
	minHeight: '23.5rem',
	maxHeight: '14.875rem',
	overflow: 'hidden',
}));

const SectionTitle = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
}));

const IconCircle = styled(Box)(() => ({
	backgroundColor: '#F69F77',
	borderRadius: '50%',
	width: '2rem',
	height: '2rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

const SectionEmotion = styled(Box)(() => ({}));
const SectionRecommendation = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
	gap: '1.5rem',
	flexWrap: 'nowrap',
	maxWidth: '100%',
	overflowX: 'auto',
}));

const LeftText = styled(Box)(() => ({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
}));

const ImageBox = styled(Box)(() => ({
	width: '125px',
	height: '170px',
	borderRadius: '12px',
	flexShrink: 0,
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: '12px',
	},
}));
