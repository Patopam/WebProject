import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AddIcon from '@mui/icons-material/Add';
export default function ImageCarousel() {
	const plugin = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

	const fakeImages = [
		'https://images.unsplash.com/photo-1507919981545-78e7ef4bba3c?auto=format&fit=crop&w=800&q=80',
		'https://images.unsplash.com/photo-1601758123927-1961b24d7f98?auto=format&fit=crop&w=800&q=80',
		'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
	];

	return (
		<div className='relative w-full max-w-md'>
			<div className='absolute top-2 right-2 z-10'>
				<div className='w-10 h-10 bg-[#CBCBE7] rounded-full flex items-center justify-center shadow'>
					<AddIcon sx={{ color: '#000000', fontSize: '20px' }} />
				</div>
			</div>

			<Carousel plugins={[plugin.current]} onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
				<CarouselContent>
					{fakeImages.map((url, index) => (
						<CarouselItem key={index}>
							<div className='p-1'>
								<Card>
									<CardContent className='aspect-video p-0 overflow-hidden rounded-lg'>
										<img src={url} alt={`Imagen ${index + 1}`} className='w-full h-full object-cover rounded-lg' />
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
