import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveUserImage, getUserImages, deleteUserImage } from '../../services/firebaseUtils'; // Ajusta la ruta según tu estructura

export const uploadImageToCloudinary = createAsyncThunk(
	'cloudinary/uploadImage',
	async ({ file, uid }, { rejectWithValue }) => {
		if (!uid) {
			return rejectWithValue('User ID is required');
		}

		const cloudName = 'dwkycobbx';
		const uploadPreset = 'my_unsigned_preset';
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', uploadPreset);
		formData.append('timestamp', Math.floor(Date.now() / 1000).toString());

		try {
			const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error of Cloudinary:', errorData);
				const errorMessage =
					errorData.error?.message || (typeof errorData.error === 'string' ? errorData.error : 'Error uploading image');
				return rejectWithValue(errorMessage);
			}

			const cloudinaryData = await response.json();

			// save firebase
			const imageData = {
				public_id: cloudinaryData.public_id,
				secure_url: cloudinaryData.secure_url,
				original_filename: cloudinaryData.original_filename || 'image',
				format: cloudinaryData.format,
				width: cloudinaryData.width,
				height: cloudinaryData.height,
				bytes: cloudinaryData.bytes,
			};

			const savedImage = await saveUserImage({ uid, imageData });
			return savedImage;
		} catch (error) {
			console.error('Error in the request:', error);
			return rejectWithValue(error.message || 'Upload error');
		}
	}
);

export const loadUserImages = createAsyncThunk('cloudinary/loadUserImages', async (uid, { rejectWithValue }) => {
	if (!uid) {
		return rejectWithValue('User ID is required');
	}

	try {
		const images = await getUserImages({ uid });
		return images;
	} catch (error) {
		console.error('Error loading user images:', error);
		return rejectWithValue(error.message || 'Error loading images');
	}
});

export const deleteImage = createAsyncThunk(
	'cloudinary/deleteImage',
	async ({ uid, imageId, publicId }, { rejectWithValue }) => {
		if (!uid || !imageId) {
			return rejectWithValue('User ID and Image ID are required');
		}

		try {
			await deleteUserImage({ uid, imageId });

			return { imageId, publicId };
		} catch (error) {
			console.error('Error deleting image:', error);
			return rejectWithValue(error.message || 'Error deleting image');
		}
	}
);

const initialState = {
	images: [],
	currentUpload: null,
	isLoading: false,
	error: null,
	lastUploadedUrl: null,
	isLoadingImages: false,
};

const cloudinarySlice = createSlice({
	name: 'cloudinary',
	initialState,
	reducers: {
		clearImages: (state) => {
			state.images = [];
		},
		clearError: (state) => {
			state.error = null;
		},
		resetState: (state) => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			// Upload image
			.addCase(uploadImageToCloudinary.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(uploadImageToCloudinary.fulfilled, (state, action) => {
				state.isLoading = false;
				state.images.push(action.payload);
				state.lastUploadedUrl = action.payload.secure_url;
				state.currentUpload = action.payload;
			})
			.addCase(uploadImageToCloudinary.rejected, (state, action) => {
				state.isLoading = false;
				state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error uploading image';
			})
			// Load user images
			.addCase(loadUserImages.pending, (state) => {
				state.isLoadingImages = true;
			})
			.addCase(loadUserImages.fulfilled, (state, action) => {
				state.isLoadingImages = false;
				state.images = action.payload;
			})
			.addCase(loadUserImages.rejected, (state, action) => {
				state.isLoadingImages = false;
				state.error = typeof action.payload === 'string' ? action.payload : 'Error loading images';
			})

			.addCase(deleteImage.fulfilled, (state, action) => {
				state.images = state.images.filter((image) => image.id !== action.payload.imageId);
			})
			.addCase(deleteImage.rejected, (state, action) => {
				state.error = typeof action.payload === 'string' ? action.payload : 'Error deleting image';
			});
	},
});

export const { clearImages, clearError, resetState } = cloudinarySlice.actions;

export const selectCloudinaryImages = (state) => state.cloudinary.images;
export const selectIsUploading = (state) => state.cloudinary.isLoading;
export const selectIsLoadingImages = (state) => state.cloudinary.isLoadingImages;
export const selectCloudinaryError = (state) => state.cloudinary.error;
export const selectLastUploadedUrl = (state) => state.cloudinary.lastUploadedUrl;
export const selectCurrentUpload = (state) => state.cloudinary.currentUpload;

export default cloudinarySlice.reducer;
