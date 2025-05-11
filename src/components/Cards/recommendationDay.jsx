import React from 'react';
import { Box, Typography } from '@mui/material';
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
