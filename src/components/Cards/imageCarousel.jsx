import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Importamos las acciones y selectores de Redux
import {
	uploadImageToCloudinary,
	selectIsUploading,
	selectCloudinaryError,
	selectCloudinaryImages,
	clearError,
} from '../../redux/cloudinarySlice/cloudinarySlice';

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
	maxWidth: '40rem',
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
	padding: '0.5rem',
	boxSizing: 'border-box',
});

const SlideImage = styled('img')({
	width: '100%',
	height: 'auto',
	aspectRatio: '16/9',
	maxHeight: '15rem',
	objectFit: 'cover',
	borderRadius: '0.75rem',
});

const AddButtonContainer = styled('div')({
	position: 'absolute',
	top: '0.75rem',
	right: '0.75rem',
	zIndex: 2,
});

const AddButtonCircle = styled(IconButton)(({ theme }) => ({
	width: '2.25rem',
	height: '2.25rem',
	backgroundColor: theme.palette.grey[300],
	'&:hover': {
		backgroundColor: theme.palette.grey[400],
	},
}));

const UploadInput = styled('input')({
	display: 'none',
});

export default function ImageCarousel() {
	// Estado local para imágenes iniciales + imágenes de Cloudinary
	const [allImages, setAllImages] = useState(initialImages);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	// Redux
	const dispatch = useDispatch();
	const isUploading = useSelector(selectIsUploading);
	const error = useSelector(selectCloudinaryError);
	const cloudinaryImages = useSelector(selectCloudinaryImages);

	// Embla Carousel
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);
	const fileInputRef = useRef(null);

	// Efecto para actualizar las imágenes cuando cambian las imágenes de Cloudinary
	useEffect(() => {
		// Actualizar las imágenes cuando cambian las imágenes de Cloudinary
		const cloudinaryUrls = cloudinaryImages.map((img) => img.secure_url);
		setAllImages([...initialImages, ...cloudinaryUrls]);
	}, [cloudinaryImages]);

	// Efecto para mostrar errores
	useEffect(() => {
		if (error) {
			setSnackbarMessage(error);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
			// Limpiamos el error después de mostrarlo
			dispatch(clearError());
		}
	}, [error, dispatch]);

	// Manejadores
	const handleAddButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (!file || !file.type.match('image.*')) return;

		try {
			// Subir imagen a Cloudinary usando Redux
			await dispatch(uploadImageToCloudinary(file)).unwrap();

			// Mostrar mensaje de éxito
			setSnackbarMessage('Imagen subida correctamente');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);

			// Limpiar input para permitir seleccionar el mismo archivo otra vez
			event.target.value = '';
		} catch (err) {
			console.error('Error al subir la imagen:', err);
			// El error ya se maneja en el useEffect de arriba

			// Limpiar input para permitir seleccionar el mismo archivo otra vez
			event.target.value = '';
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	return (
		<>
			<CarouselContainer>
				<EmblaContainer ref={emblaRef}>
					<EmblaSlideContainer>
						{allImages.map((src, index) => (
							<EmblaSlide key={`slide-${index}-${src}`}>
								<SlideImage
									src={src}
									alt={`slide-${index}`}
									onError={(e) => {
										console.error(`Error loading image: ${src}`);
										e.target.src = 'https://via.placeholder.com/400x225?text=Error+de+carga';
									}}
								/>
							</EmblaSlide>
						))}
					</EmblaSlideContainer>
				</EmblaContainer>

				<AddButtonContainer>
					<AddButtonCircle onClick={handleAddButtonClick} disabled={isUploading}>
						{isUploading ? (
							<CircularProgress size={20} color='inherit' />
						) : (
							<AddIcon style={{ fontSize: '1.25rem', color: '#000000' }} />
						)}
					</AddButtonCircle>
				</AddButtonContainer>

				<UploadInput ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} />
			</CarouselContainer>

			{/* Notificaciones */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
