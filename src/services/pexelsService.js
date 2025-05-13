export async function getImageFromKeyword(keyword) {
	try {
		const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1`, {
			headers: {
				Authorization: import.meta.env.VITE_PEXELS_API_KEY,
			},
		});

		const data = await response.json();

		if (data.photos && data.photos.length > 0) {
			return data.photos[0].src.medium; // o .large para mayor resolución
		} else {
			console.warn('No image found for keyword:', keyword);
			return 'https://via.placeholder.com/300x200?text=No+image+found';
		}
	} catch (error) {
		console.error('Error fetching image from Pexels:', error);
		return 'https://via.placeholder.com/300x200?text=Error+loading+image';
	}
}
