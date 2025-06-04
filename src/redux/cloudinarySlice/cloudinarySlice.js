import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadImageToCloudinary = createAsyncThunk('cloudinary/uploadImage', async (file, { rejectWithValue }) => {
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
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error in the request:', error);
		return rejectWithValue(error.message || 'Upload error');
	}
});

const initialState = {
	images: [],
	currentUpload: null,
	isLoading: false,
	error: null,
	lastUploadedUrl: null,
};

const cloudinarySlice = createSlice({
	name: 'cloudinary',
	initialState,
	reducers: {
		// Add an image to the list (without uploading)
		addImage: (state, action) => {
			state.images.push(action.payload);
		},
		// Remove an image from the list
		removeImage: (state, action) => {
			state.images = state.images.filter((image) => image.public_id !== action.payload);
		},
		// Clear the image list
		clearImages: (state) => {
			state.images = [];
		},
		// Clean the error
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Image upload handling
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
			});
	},
});

export const { addImage, removeImage, clearImages, clearError } = cloudinarySlice.actions;
export const selectCloudinaryImages = (state) => state.cloudinary.images;
export const selectIsUploading = (state) => state.cloudinary.isLoading;
export const selectCloudinaryError = (state) => state.cloudinary.error;
export const selectLastUploadedUrl = (state) => state.cloudinary.lastUploadedUrl;
export const selectCurrentUpload = (state) => state.cloudinary.currentUpload;
export default cloudinarySlice.reducer;
