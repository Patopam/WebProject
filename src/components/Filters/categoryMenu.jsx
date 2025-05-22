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
						minWidth: '2.5rem',
						height: '2.813rem',
						padding: '6px 24px',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '24px',
						borderRadius: '999px',
						background: selectedCategory === category ? '#4B4990' : '#5F5DA6',
						color: '#fff',
						border: 'none',
						cursor: 'pointer',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '14px',
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
