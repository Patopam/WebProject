import React, { useState, useEffect } from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { getRecommendationFromEmotion } from '../../services/openaiService';
import { getImageFromKeyword } from '../../services/pexelsService';
import { useDispatch, useSelector } from 'react-redux';
import { setAiLoading } from '../../redux/aiStatusSlice';

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

			// Save to localStorage
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
					<LightbulbOutlinedIcon sx={{ color: '#333', fontSize: '1.23rem' }} />
				</IconCircle>
				<Typography
					sx={{
						fontFamily: "'Manrope', sans-serif",
						fontSize: '1.125rem',
						fontWeight: 300,
						color: '#333',
					}}
				>
					Recommendation of the day
				</Typography>
			</SectionTitle>

			{recommendation && (
				<SectionEmotion>
					<Typography sx={{ fontSize: '1.35rem', color: '#333', lineHeight: 1.4 }}>{recommendation.intro}</Typography>
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
								fontSize: '1.25rem',
								marginBottom: '0.4rem',
								lineHeight: 1.2,
							}}
						>
							{recommendation.title}
						</Typography>
						<Typography sx={{ fontSize: '1.25rem', color: '#333', lineHeight: 1.2 }}>
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
	padding: '1.8rem',
	borderRadius: '1.5rem',
	fontFamily: '"Manrope", sans-serif',
	width: '100%',
	maxWidth: '75rem',
	margin: '0 auto',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	minHeight: '24.9rem',
	maxHeight: '14.875rem',
	overflow: 'hidden',
}));

const SectionTitle = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: '0.625rem',
}));

const IconCircle = styled(Box)(() => ({
	backgroundColor: '#F69F77',
	borderRadius: '50%',
	width: '2.31rem',
	height: '2.31rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

const SectionEmotion = styled(Box)(() => ({}));

const SectionRecommendation = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
	gap: '2rem',
	flexWrap: 'nowrap',
}));

const LeftText = styled(Box)(() => ({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	maxHeight: '8rem',
	overflow: 'hidden',
}));

const ImageBox = styled(Box)(() => ({
	width: '145px',
	height: '180px',
	borderRadius: '12px',
	overflow: 'hidden',
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: '12px',
	},
}));
