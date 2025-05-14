// cloudinarySlice.js - Corregido para upload_preset
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para subir imágenes a Cloudinary (corregido)
export const uploadImageToCloudinary = createAsyncThunk('cloudinary/uploadImage', async (file, { rejectWithValue }) => {
	const cloudName = 'dwkycobbx'; // Tu cloud_name de Cloudinary

	// Usar el preset correcto que está configurado como unsigned en Cloudinary
	const uploadPreset = 'my_unsigned_preset'; // Tu upload_preset creado en Cloudinary

	// Creamos un FormData nuevo
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', uploadPreset);

	// También es buena práctica agregar un timestamp para evitar problemas de caché
	formData.append('timestamp', Math.floor(Date.now() / 1000).toString());

	try {
		console.log('Enviando imagen a Cloudinary con preset:', uploadPreset);
		const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Error de Cloudinary:', errorData);
			// Extraemos el mensaje de error de forma más robusta
			const errorMessage =
				errorData.error?.message ||
				(typeof errorData.error === 'string' ? errorData.error : 'Error al subir la imagen');
			return rejectWithValue(errorMessage);
		}

		const data = await response.json();
		console.log('Respuesta de Cloudinary:', data);
		return data;
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return rejectWithValue(error.message || 'Error en la subida');
	}
});

// Estado inicial
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
		// Agregar una imagen a la lista (sin subir)
		addImage: (state, action) => {
			state.images.push(action.payload);
		},

		// Remover una imagen de la lista
		removeImage: (state, action) => {
			state.images = state.images.filter((image) => image.public_id !== action.payload);
		},

		// Limpiar la lista de imágenes
		clearImages: (state) => {
			state.images = [];
		},

		// Limpiar el error
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Manejo de la subida de imagen
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
				// Aseguramos que error sea siempre una cadena
				state.error = typeof action.payload === 'string' ? action.payload : 'Error desconocido al subir la imagen';
			});
	},
});

// Exportar acciones
export const { addImage, removeImage, clearImages, clearError } = cloudinarySlice.actions;

// Exportar selectores
export const selectCloudinaryImages = (state) => state.cloudinary.images;
export const selectIsUploading = (state) => state.cloudinary.isLoading;
export const selectCloudinaryError = (state) => state.cloudinary.error;
export const selectLastUploadedUrl = (state) => state.cloudinary.lastUploadedUrl;
export const selectCurrentUpload = (state) => state.cloudinary.currentUpload;

// Exportar reducer
export default cloudinarySlice.reducer;
