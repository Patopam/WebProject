import React, { useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// Imágenes iniciales
const initialImages = [
	'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
	'https://images.unsplash.com/photo-1507919981545-78e7ef4bba3c?auto=format&fit=crop&w=800&q=80',
	'https://images.unsplash.com/photo-1601758123927-1961b24d7f98?auto=format&fit=crop&w=800&q=80',
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

const UploadButtonContainer = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	padding: '8px 0',
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

			<UploadButtonContainer>
				<Button variant='contained' startIcon={<PhotoCamera />} onClick={handleAddButtonClick} size='small'>
					Subir nueva imagen
				</Button>
				<UploadInput ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} />
			</UploadButtonContainer>
		</CarouselContainer>
	);
}
