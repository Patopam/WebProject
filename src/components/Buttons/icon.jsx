import * as React from 'react';
import IconButton from '@mui/material/IconButton';

export default function CustomIconButton({ icon, onClick, ariaLabel = 'button' }) {
	return (
		<IconButton
			aria-label={ariaLabel}
			onClick={onClick}
			sx={{
				alignItems: 'center',
				backgroundColor: '#33336F',
				color: '#ffffff',
				width: '55px',
				height: '55px',
				'&:hover': {
					backgroundColor: '#CBCBE7',
				},
			}}
		>
			{icon}
		</IconButton>
	);
}
