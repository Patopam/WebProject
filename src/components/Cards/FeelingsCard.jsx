import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';

const FeelingsCard = ({ compact = false }) => {
	return (
		<Card
			sx={{
				display: 'flex',
				width: '100%',
				maxWidth: compact ? '19.375rem' : '40rem',
				height: 'auto',
				minHeight: compact ? '11.375rem' : '14.875rem',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '1.5rem',
				background: '#FCD8C2',
				boxShadow: 'none',
				padding: compact ? '1.75rem' : '1.75rem',

				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '100%',
					height: '100%',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: compact ? '0.625rem' : '1.25rem',
					padding: '0px !important',
					'&:last-child': { paddingBottom: 0 },
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						marginBottom: compact ? '0.5rem' : 0,
					}}
				>
					<Box
						sx={{
							backgroundColor: '#F99F75',
							borderRadius: '50%',
							width: '2.31rem',
							height: '2.31rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginRight: '0.625rem',
							flexShrink: 0,
						}}
					>
						<FlashOnOutlinedIcon sx={{ color: '#000', fontSize: '1.25rem' }} />
					</Box>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '1.125rem',
							fontWeight: 300,
							color: '#333',
							lineHeight: 'normal',
						}}
					>
						Feelings & Finances
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start',
						gap: '0.625rem',
					}}
				>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: compact ? '2.25rem' : '3rem',
							fontWeight: 600,
							color: '#000',
							lineHeight: 1,
							flexShrink: 0,
						}}
					>
						50%
					</Typography>

					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: compact ? '0.875rem' : '1rem',
							fontWeight: 400,
							color: '#444',
							lineHeight: '125%',
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'left',
						}}
						component='div'
					>
						<span>
							Of your <strong>expenses</strong>
						</span>
						<span>are when you are</span>
					</Typography>
				</Box>

				<Typography
					sx={{
						fontFamily: "'Manrope', sans-serif",
						fontSize: compact ? '2rem' : '2.5rem',
						fontWeight: 500,
						color: '#333',
						lineHeight: '125%',
						marginTop: compact ? '-0.31rem' : 0,
					}}
				>
					stressed
				</Typography>
			</CardContent>
		</Card>
	);
};

export default FeelingsCard;
