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

const CarouselContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.spacing(2),
	background: theme.palette.grey[200],
	width: '100%',
	maxWidth: '40rem', //
	overflow: 'hidden',
	boxSizing: 'border-box',
}));

const EmblaContainer = styled('div')({
	overflow: 'hidden',
	width: '100%',
});

const EmblaSlideContainer = styled('div')({
	display: 'flex',
});

const EmblaSlide = styled('div')({
	flex: '0 0 100%',
	padding: '0.5rem', // 8px
	boxSizing: 'border-box',
});

const SlideImage = styled('img')({
	width: '100%',
	height: 'auto',
	aspectRatio: '16/9',
	maxHeight: '15rem', // 240px
	objectFit: 'cover',
	borderRadius: '0.75rem', // 12px
});

const AddButtonContainer = styled('div')({
	position: 'absolute',
	top: '0.75rem', // 12px
	right: '0.75rem', // 12px
	zIndex: 2,
});

const AddButtonCircle = styled(IconButton)(({ theme }) => ({
	width: '2.25rem', // 36px
	height: '2.25rem', // 36px
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
					<AddIcon style={{ fontSize: '1.25rem', color: '#000000' }} />
				</AddButtonCircle>
			</AddButtonContainer>

			<UploadInput ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} />
		</CarouselContainer>
	);
}

export function ImageCarouselWithProps({ compact = false }) {
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

	const containerStyle = {
		position: 'relative',
		borderRadius: '1rem',
		background: '#f5f5f5',
		width: '100%',
		maxWidth: compact ? '20rem' : '26.75rem', // 320px o 427px
		overflow: 'hidden',
		boxSizing: 'border-box',
	};

	const slideImageStyle = {
		width: '100%',
		height: 'auto',
		aspectRatio: '16/9',
		maxHeight: compact ? '12rem' : '15rem', // 192px o 240px
		objectFit: 'cover',
		borderRadius: '0.75rem',
	};

	const addButtonStyle = {
		width: compact ? '2rem' : '2.25rem', // 32px o 36px
		height: compact ? '2rem' : '2.25rem', // 32px o 36px
		backgroundColor: '#e0e0e0',
		color: '#000000',
	};

	const iconSize = compact ? '1.125rem' : '1.25rem'; // 18px o 20px

	return (
		<div style={containerStyle}>
			<div ref={emblaRef} style={{ overflow: 'hidden', width: '100%' }}>
				<div style={{ display: 'flex' }}>
					{images.map((src, index) => (
						<div
							key={index}
							style={{
								flex: '0 0 100%',
								padding: '0.5rem',
								boxSizing: 'border-box',
							}}
						>
							<img src={src} alt={`slide-${index}`} style={slideImageStyle} />
						</div>
					))}
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					top: '0.75rem',
					right: '0.75rem',
					zIndex: 2,
				}}
			>
				<IconButton onClick={handleAddButtonClick} style={addButtonStyle}>
					<AddIcon style={{ fontSize: iconSize, color: '#000000' }} />
				</IconButton>
			</div>

			<input ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} style={{ display: 'none' }} />
		</div>
	);
}
