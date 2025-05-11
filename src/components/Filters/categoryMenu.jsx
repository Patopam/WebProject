import React from 'react';
import { Box } from '@mui/material';

const CategoryMenu = ({ categories, selectedCategory, onCategoryClick }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '8px',
				marginBottom: '24px',
			}}
		>
			{categories.map((category) => (
				<Box
					key={category}
					component='button'
					onClick={() => onCategoryClick(category)}
					sx={{
						display: 'flex',
						minWidth: '2.5rem', // Ancho mínimo
						height: '2.813rem', // Igual que MonthFilter
						padding: '6px 24px', // Igual que MonthFilter
						justifyContent: 'center',
						alignItems: 'center',
						gap: '24px', // Agregado de MonthFilter
						borderRadius: '999px',
						background: selectedCategory === category ? '#4B4990' : '#5F5DA6',
						color: '#fff',
						border: 'none',
						cursor: 'pointer',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '14px', // Cambiado de 16px a 14px como MonthFilter
						fontWeight: 500,
						whiteSpace: 'nowrap',
						'&:hover': {
							background: '#4B4990',
						},
					}}
				>
					{category}
				</Box>
			))}
		</Box>
	);
};

export default CategoryMenu;
