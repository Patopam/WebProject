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
				maxWidth: compact ? '19.375rem' : '40rem', // 310px o 427px
				height: 'auto',
				minHeight: compact ? '11.375rem' : '14.875rem', // 182px o 238px
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '1.5rem', // 24px
				background: '#FCD8C2',
				boxShadow: 'none',
				padding: compact ? '1.75rem' : '1.75rem', // 28px, uniforme para ambos modos
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
					gap: compact ? '0.625rem' : '1.25rem', // 10px o 20px
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
							width: '2.31rem', // 37px
							height: '2.31rem', // 37px
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginRight: '0.625rem', // 10px
							flexShrink: 0,
						}}
					>
						<FlashOnOutlinedIcon sx={{ color: '#000', fontSize: '1.25rem' }} />
					</Box>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '1.125rem', // 18px
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
						gap: '0.625rem', // 10px
					}}
				>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: compact ? '2.25rem' : '3rem', // 36px o 48px
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
							fontSize: compact ? '0.875rem' : '1rem', // 14px o 16px
							fontWeight: 400,
							color: '#444',
							lineHeight: '125%',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<p style={{ margin: 0 }}>
							Of your <strong>expenses</strong> <br />
							are when you are
						</p>
					</Typography>
				</Box>

				<Typography
					sx={{
						fontFamily: "'Manrope', sans-serif",
						fontSize: compact ? '2rem' : '2.5rem', // 32px o 40px
						fontWeight: 500,
						color: '#333',
						lineHeight: '125%',
						marginTop: compact ? '-0.31rem' : 0, // -5px o 0
					}}
				>
					stressed
				</Typography>
			</CardContent>
		</Card>
	);
};

export default FeelingsCard;
