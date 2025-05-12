import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { getRecommendationFromEmotion } from '../../services/openaiService';
import { getImageFromKeyword } from '../../services/pexelsService';
import { useDispatch, useSelector } from 'react-redux';
import { setAiLoading } from '../../redux/aiStatusSlice';

const RecommendationDay = ({ emotion }) => {
	const [recommendation, setRecommendation] = useState({
		intro: '',
		title: '',
		description: '',
		imageUrl: '',
	});

	const dispatch = useDispatch();
	const loadingAI = useSelector((state) => state.aiStatus.loading);

	useEffect(() => {
		if (!emotion || emotion.trim() === '' || loadingAI) return;

		const fetchData = async () => {
			try {
				dispatch(setAiLoading(true));
				const aiData = await getRecommendationFromEmotion(emotion);
				const image = await getImageFromKeyword(aiData.imageKeyword);
				setRecommendation({
					intro: aiData.intro,
					title: aiData.title,
					description: aiData.description,
					imageUrl: image,
				});
			} catch (error) {
				console.error('Error loading recommendation:', error);
			} finally {
				dispatch(setAiLoading(false));
			}
		};

		fetchData();
	}, [emotion]);

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

			<SectionEmotion>
				<Typography sx={{ fontSize: '1.35rem', color: '#333', lineHeight: 1.4 }}>
					{recommendation.intro || `You are feeling ${emotion}...`}
				</Typography>
			</SectionEmotion>

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
		</CardContainer>
	);
};

export default RecommendationDay;

// ESTILOS

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
