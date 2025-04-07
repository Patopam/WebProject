import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';

const FeelingsCard = () => {
	return (
		<Card
			sx={{
				display: 'flex',
				width: '427px',
				height: '238px',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '24px',
				background: '#FCD8C2',
				boxShadow: 'none',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					width: '371px',
					height: '190px',
					flexDirection: 'column',
					alignItems: 'flex-start',
					gap: '20px',
					padding: 0,
					'&:last-child': { paddingBottom: 0 },
				}}
			>
				{/* Header */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
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
							fontSize: '48px',
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
							fontSize: '16px',
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
						fontSize: '40px',
						fontWeight: 500,
						color: '#333',
						lineHeight: '125%',
					}}
				>
					stressed
				</Typography>
			</CardContent>
		</Card>
	);
};

export default FeelingsCard;
