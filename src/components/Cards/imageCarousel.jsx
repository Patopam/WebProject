import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
	uploadImageToCloudinary,
	loadUserImages,
	deleteImage,
	selectIsUploading,
	selectIsLoadingImages,
	selectCloudinaryError,
	selectCloudinaryImages,
	clearError,
	resetState,
} from '../../redux/cloudinarySlice/cloudinarySlice';

const CarouselContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.spacing(2),
	background: theme.palette.grey[200],
	width: '100%',
	maxWidth: '100%',
	overflow: 'hidden',
	boxSizing: 'border-box',
	minHeight: '200px',

	'@media (max-width: 1024px)': {
		maxWidth: '100%',
		minHeight: '180px',
	},

	'@media (max-width: 767px)': {
		maxWidth: '100%',
		minHeight: '160px',
	},

	'@media (max-width: 425px)': {
		maxWidth: '100%',
		minHeight: '140px',
	},
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
	position: 'relative',
});

const SlideImage = styled('img')(() => ({
	width: '100%',
	height: 'auto',
	aspectRatio: '16/9',
	maxHeight: '15rem',
	objectFit: 'cover',
	borderRadius: '0.75rem',

	'@media (max-width: 1024px)': {
		maxHeight: '12rem',
	},

	'@media (max-width: 767px)': {
		maxHeight: '10rem',
	},

	'@media (max-width: 425px)': {
		maxHeight: '8rem',
	},
}));

const EmptyStateContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	minHeight: '200px',
	color: theme.palette.text.secondary,
	textAlign: 'center',
	padding: theme.spacing(2),
}));

const AddButtonContainer = styled('div')({
	position: 'absolute',
	top: '0.75rem',
	right: '0.75rem',
	zIndex: 2,
});

const DeleteButtonContainer = styled('div')({
	position: 'absolute',
	bottom: '0.75rem',
	right: '0.75rem',
	zIndex: 2,
});

const ActionButtonCircle = styled(IconButton)(({ theme }) => ({
	width: '2.25rem',
	height: '2.25rem',
	backgroundColor: theme.palette.grey[300],
	'&:hover': {
		backgroundColor: theme.palette.grey[400],
	},

	'@media (max-width: 767px)': {
		width: '2rem',
		height: '2rem',
	},

	'@media (max-width: 425px)': {
		width: '1.75rem',
		height: '1.75rem',
	},
}));

const UploadInput = styled('input')({
	display: 'none',
});

export default function ImageCarousel() {
	const auth = getAuth();
	const [user, loading] = useAuthState(auth);

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [imageToDeleteIndex, setImageToDeleteIndex] = useState(-1);

	// Redux
	const dispatch = useDispatch();
	const isUploading = useSelector(selectIsUploading);
	const isLoadingImages = useSelector(selectIsLoadingImages);
	const error = useSelector(selectCloudinaryError);
	const userImages = useSelector(selectCloudinaryImages);

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: userImages.length > 0 },
		userImages.length > 0 ? [Autoplay({ delay: 3000 })] : []
	);
	const fileInputRef = useRef(null);

	// Load user images when user is authenticated
	useEffect(() => {
		if (user?.uid) {
			dispatch(loadUserImages(user.uid));
		}
	}, [user?.uid, dispatch]);

	useEffect(() => {
		if (!user && !loading) {
			dispatch(resetState());
		}
	}, [user, loading, dispatch]);

	// Handle errors
	useEffect(() => {
		if (error) {
			setSnackbarMessage(error);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	// Track current slide
	useEffect(() => {
		if (!emblaApi || userImages.length === 0) return;

		const onSelect = () => {
			setCurrentSlideIndex(emblaApi.selectedScrollSnap());
		};

		emblaApi.on('select', onSelect);
		onSelect();

		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi, userImages.length]);

	useEffect(() => {
		if (emblaApi && userImages.length > 0) {
			emblaApi.reInit({ loop: userImages.length > 1 });
		}
	}, [emblaApi, userImages.length]);

	const handleAddButtonClick = () => {
		if (!user) {
			setSnackbarMessage('Please log in to upload images');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
			return;
		}
		fileInputRef.current.click();
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (!file || !file.type.match('image.*')) return;

		if (!user?.uid) {
			setSnackbarMessage('Please log in to upload images');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
			event.target.value = '';
			return;
		}

		try {
			await dispatch(uploadImageToCloudinary({ file, uid: user.uid })).unwrap();
			setSnackbarMessage('Image uploaded successfully');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
			event.target.value = '';
		} catch (err) {
			console.error('Error uploading image:', err);
			event.target.value = '';
		}
	};

	const handleDeleteButtonClick = () => {
		if (!user) {
			setSnackbarMessage('Please log in to delete images');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
			return;
		}
		setImageToDeleteIndex(currentSlideIndex);
		setDeleteDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (imageToDeleteIndex >= 0 && user?.uid) {
			const imageToDelete = userImages[imageToDeleteIndex];

			try {
				await dispatch(
					deleteImage({
						uid: user.uid,
						imageId: imageToDelete.id,
						publicId: imageToDelete.public_id,
					})
				).unwrap();

				setSnackbarMessage('Image deleted successfully');
				setSnackbarSeverity('success');
				setOpenSnackbar(true);
			} catch (err) {
				console.error('Error deleting image:', err);
			}
		}
		setDeleteDialogOpen(false);
	};

	const handleCancelDelete = () => {
		setDeleteDialogOpen(false);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	if (loading) {
		return (
			<CarouselContainer>
				<EmptyStateContainer>
					<CircularProgress />
					<Typography variant='body1' sx={{ mt: 2 }}>
						Loading...
					</Typography>
				</EmptyStateContainer>
			</CarouselContainer>
		);
	}

	if (!user) {
		return (
			<CarouselContainer>
				<EmptyStateContainer>
					<Typography variant='h6' gutterBottom>
						Please log in to view your images
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						You need to be logged in to upload and manage your personal image carousel.
					</Typography>
				</EmptyStateContainer>
			</CarouselContainer>
		);
	}

	// Show loading state while fetching images
	if (isLoadingImages) {
		return (
			<CarouselContainer>
				<EmptyStateContainer>
					<CircularProgress />
					<Typography variant='body1' sx={{ mt: 2 }}>
						Loading your images...
					</Typography>
				</EmptyStateContainer>
			</CarouselContainer>
		);
	}

	if (userImages.length === 0) {
		return (
			<>
				<CarouselContainer>
					<EmptyStateContainer>
						<Typography variant='h6' gutterBottom>
							No images yet
						</Typography>
						<Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
							Upload your first image to get started <br /> with your personal carousel.
						</Typography>
						<ActionButtonCircle onClick={handleAddButtonClick} disabled={isUploading}>
							{isUploading ? (
								<CircularProgress size={20} color='inherit' />
							) : (
								<AddIcon style={{ fontSize: '1.25rem', color: '#000000' }} />
							)}
						</ActionButtonCircle>
					</EmptyStateContainer>
					<UploadInput ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} />
				</CarouselContainer>
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

	return (
		<>
			<CarouselContainer>
				<EmblaContainer ref={emblaRef}>
					<EmblaSlideContainer>
						{userImages.map((image, index) => (
							<EmblaSlide key={`slide-${index}-${image.id}`}>
								<SlideImage
									src={image.secure_url}
									alt={`slide-${index}`}
									onError={(e) => {
										console.error(`Error loading image: ${image.secure_url}`);
										e.target.src = 'https://via.placeholder.com/400x225?text=Error+loading+image';
									}}
								/>
							</EmblaSlide>
						))}
					</EmblaSlideContainer>
				</EmblaContainer>
				<AddButtonContainer>
					<ActionButtonCircle onClick={handleAddButtonClick} disabled={isUploading}>
						{isUploading ? (
							<CircularProgress size={20} color='inherit' />
						) : (
							<AddIcon style={{ fontSize: '1.25rem', color: '#000000' }} />
						)}
					</ActionButtonCircle>
				</AddButtonContainer>
				{userImages.length > 0 && (
					<DeleteButtonContainer>
						<ActionButtonCircle onClick={handleDeleteButtonClick} disabled={isUploading || userImages.length === 0}>
							<DeleteIcon style={{ fontSize: '1.25rem', color: '#000000' }} />
						</ActionButtonCircle>
					</DeleteButtonContainer>
				)}
				<UploadInput ref={fileInputRef} accept='image/*' type='file' onChange={handleFileUpload} />
			</CarouselContainer>

			<Dialog
				open={deleteDialogOpen}
				onClose={handleCancelDelete}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Delete Image?</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to remove this image from your carousel? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelDelete} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleConfirmDelete} color='error' autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>

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
