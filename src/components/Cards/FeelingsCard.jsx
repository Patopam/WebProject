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
				width: compact ? '310px' : '427px',
				height: compact ? '182px' : '238px',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '24px',
				background: '#FCD8C2',
				boxShadow: 'none',
				padding: compact ? '28px' : 0,
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '100%',
					height: '100%',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: compact ? '10px' : '20px',
					padding: '0px !important',
					'&:last-child': { paddingBottom: 0 },
				}}
			>
				{/* Header */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						mb: compact ? 1 : 0,
					}}
				>
					<Box
						sx={{
							backgroundColor: '#F99F75',
							borderRadius: '50%',
							width: '37px',
							height: '37px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginRight: '10px',
						}}
					>
						<FlashOnOutlinedIcon sx={{ color: '#000' }} />
					</Box>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '18px',
							fontWeight: 300,
							color: '#333',
							lineHeight: 'normal',
						}}
					>
						Feelings & Finances
					</Typography>
				</Box>

				{/* Content */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start',
						gap: '10px',
					}}
				>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: compact ? '36px' : '48px',
							fontWeight: 600,
							color: '#000',
							lineHeight: 1,
						}}
					>
						50%
					</Typography>
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: compact ? '14px' : '16px',
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
						fontSize: compact ? '32px' : '40px',
						fontWeight: 500,
						color: '#333',
						lineHeight: '125%',
						mt: compact ? '-5px' : 0,
					}}
				>
					stressed
				</Typography>
			</CardContent>
		</Card>
	);
};

export default FeelingsCard;

// Ejemplos de uso:

// Versión normal
// <FeelingsCard />

// Versión compacta
// <FeelingsCard compact={true} />
