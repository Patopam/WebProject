import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const mockData = {
	emotion: 'confundido',
	title: 'Caminata sin destino',
	description: 'Da un paseo corto, sin rumbo, solo para oxigenarte.',
	imageUrl:
		'https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const RecommendationDay = () => {
	return (
		<CardContainer>
			<SectionTitle>
				<IconCircle>
					<LightbulbOutlinedIcon sx={{ color: '#333', fontSize: '1.25rem' }} />
				</IconCircle>
				<Typography
					sx={{
						fontFamily: "'Manrope', sans-serif",
						fontSize: '1.125rem', // = 18px
						fontWeight: 300,
						color: '#333',
					}}
				>
					Recommendation of the day
				</Typography>
			</SectionTitle>

			<SectionEmotion>
				<Typography sx={{ fontSize: 16 }}>
					Hoy <strong>te sientes {mockData.emotion}</strong>, por eso te recomendamos…
				</Typography>
			</SectionEmotion>

			<SectionRecommendation>
				<LeftText>
					<Typography sx={{ fontWeight: 600, fontSize: 16 }}>{mockData.title}</Typography>
					<Typography sx={{ fontSize: 15 }}>{mockData.description}</Typography>
				</LeftText>

				<ImageBox>
					<img src={mockData.imageUrl} alt={mockData.title} />
				</ImageBox>
			</SectionRecommendation>
		</CardContainer>
	);
};

export default RecommendationDay;

const CardContainer = styled(Box)(() => ({
	backgroundColor: '#fdd1bc',
	padding: '1.9rem',
	borderRadius: '1.5rem',
	fontFamily: '"Manrope", sans-serif',
	width: '100%',
	maxWidth: '75rem',
	margin: '0 auto',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	gap: '1.25rem',
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
	gap: '1.5rem',
	flexWrap: 'wrap',
}));

const LeftText = styled(Box)(() => ({
	flex: 1,
	minWidth: '200px',
}));

const ImageBox = styled(Box)(() => ({
	width: '140px',
	height: '140px',
	borderRadius: '12px',
	overflow: 'hidden',
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: '12px',
	},
}));
