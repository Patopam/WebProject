import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AddIcon from '@mui/icons-material/Add';

const images = [
	'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
	'https://images.unsplash.com/photo-1507919981545-78e7ef4bba3c?auto=format&fit=crop&w=800&q=80',
	'https://images.unsplash.com/photo-1601758123927-1961b24d7f98?auto=format&fit=crop&w=800&q=80',
];

export default function ImageCarousel() {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

	return (
		<div className='carousel-container'>
			<div className='embla' ref={emblaRef}>
				<div className='embla__container'>
					{images.map((src, index) => (
						<div className='embla__slide' key={index}>
							<img src={src} alt={`slide-${index}`} />
						</div>
					))}
				</div>
			</div>

			<div className='add-button'>
				<div className='circle'>
					<AddIcon sx={{ fontSize: '20px', color: '#000000' }} />
				</div>
			</div>
		</div>
	);
}
