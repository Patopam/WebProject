import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
const mockData = {
	emotion: 'confundido',
	title: 'Caminata sin destino',
	description: 'Da un paseo corto, sin rumbo, solo para oxigenarte.',
	imageUrl:
		'https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=600https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const RecommendationDay = () => {
	return (
		<CardContainer>
			<SectionTitle>
				<IconCircle>
					<ChangeCircleOutlinedIcon sx={{ fontSize: 18, color: '#000' }} />
				</IconCircle>
				<Typography sx={{ fontWeight: 500, fontSize: 16 }}>Recommendation of the day</Typography>
			</SectionTitle>

			<SectionEmotion>
				<Typography>
					Hoy <strong>te sientes {mockData.emotion}</strong>, por eso te recomendamos…
				</Typography>
			</SectionEmotion>

			<SectionRecommendation>
				<LeftText>
					<Typography sx={{ fontWeight: 600 }}>{mockData.title}</Typography>
					<Typography sx={{ fontSize: 14 }}>{mockData.description}</Typography>
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
	padding: '1.5rem',
	borderRadius: '1.5rem',
	fontFamily: '"Manrope", sans-serif',
	width: '100%',
	maxWidth: '75rem',
	margin: '0 auto',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
}));

const SectionTitle = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
}));

const IconCircle = styled(Box)(() => ({
	width: '1.8rem',
	height: '1.8rem',
	borderRadius: '50%',
	backgroundColor: '#facd69',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const SectionEmotion = styled(Box)(() => ({
	fontSize: '14px',
}));

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
	width: '120px',
	height: '120px',
	borderRadius: '12px',
	overflow: 'hidden',
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		borderRadius: '12px',
	},
}));
