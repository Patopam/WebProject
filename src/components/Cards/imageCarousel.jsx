import React, { useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

// Imágenes iniciales
const initialImages = [
	'https://i.pinimg.com/736x/c8/52/9c/c8529c9071cc20f4a642dbbb189d3496.jpg',
	'https://i.pinimg.com/736x/5d/24/d0/5d24d0e1423ee5b4073217e5f2c4465d.jpg',
	'https://i.pinimg.com/736x/f5/f7/b4/f5f7b4bba64a48dac65f2ccfd8afe239.jpg',
];

// Estilos con Material UI styled API
const CarouselContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.spacing(2),
	background: theme.palette.grey[200],
	width: 427,
	overflow: 'hidden',
}));

const EmblaContainer = styled('div')({
	overflow: 'hidden',
});

const EmblaSlideContainer = styled('div')({
	display: 'flex',
});

const EmblaSlide = styled('div')({
	flex: '0 0 100%',
	padding: 8,
});

const SlideImage = styled('img')({
	width: '100%',
	height: 240,
	objectFit: 'cover',
	borderRadius: 12,
});

const AddButtonContainer = styled('div')({
	position: 'absolute',
	top: 12,
	right: 12,
	zIndex: 2,
});

const AddButtonCircle = styled(IconButton)(({ theme }) => ({
	width: 36,
	height: 36,
	backgroundColor: theme.palette.grey[300],
	'&:hover': {
		backgroundColor: theme.palette.grey[400],
	},
}));

const UploadInput = styled('input')({
	display: 'none',
});

export default function ImageCarousel() {
	const [images, setImages] = useState(initialImages);
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
	const fileInputRef = useRef(null);

	const handleAddButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file && file.type.match('image.*')) {
			const imageUrl = URL.createObjectURL(file);
			setImages([...images, imageUrl]);
		}
	};

	return (
		<CarouselContainer>
			<EmblaContainer ref={emblaRef}>
				<EmblaSlideContainer>
					{images.map((src, index) => (
						<EmblaSlide key={index}>
							<SlideImage src={src} alt={`slide-${index}`} />
						</EmblaSlide>
					))}
				</EmblaSlideContainer>
			</EmblaContainer>

			<AddButtonContainer>
				<AddButtonCircle onClick={handleAddButtonClick}>
					<AddIcon style={{ fontSize: '20px', color: '#000000' }} />
				</AddButtonCircle>
			</AddButtonContainer>

			<UploadInput ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} />
		</CarouselContainer>
	);
}
