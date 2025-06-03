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
				flexDirection: 'column',
				flex: '1 1 20rem',
				width: '100%',
				minHeight: '13rem',
				height: '100%',
				justifyContent: 'flex-start',
				alignItems: 'stretch',
				borderRadius: '1.5rem',
				background: '#FCD8C2',
				boxShadow: 'none',
				padding: '1.5rem',
				boxSizing: 'border-box',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					justifyContent: 'flex-start',
					width: '100%',
					padding: 0,
					'&:last-child': { paddingBottom: 0 },
					gap: '1.3rem',
				}}
			>
				{/*Header */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						alignSelf: 'stretch',
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Box
							sx={{
								backgroundColor: '#F99F75',
								borderRadius: '50%',
								width: '2rem',
								height: '2rem',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: '0.5rem',
							}}
						>
							<FlashOnOutlinedIcon sx={{ color: '#000', fontSize: '1.125rem' }} />
						</Box>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '1rem',
								fontWeight: 400,
								color: '#333',
							}}
						>
							Feelings & Finances
						</Typography>
					</Box>
				</Box>

				{/*Contenido */}
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignSelf: 'stretch',
						gap: '0.6rem',
					}}
				>
					{/* Porcentaje + texto */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'flex-start',
							gap: '1.5rem',
						}}
					>
						<Typography
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '2.1rem',
								fontWeight: 600,
								color: '#000',
								lineHeight: 1,
							}}
						>
							50%
						</Typography>

						<Typography
							component='div'
							sx={{
								fontFamily: "'Manrope', sans-serif",
								fontSize: '0.95rem',
								fontWeight: 400,
								color: '#444',
								lineHeight: '125%',
								display: 'flex',
								flexDirection: 'column',
								textAlign: 'left',
							}}
						>
							<span>
								Of your <strong>expenses</strong>
							</span>
							<span>are when you are</span>
						</Typography>
					</Box>

					{/* Emoción */}
					<Typography
						sx={{
							fontFamily: "'Manrope', sans-serif",
							fontSize: '1.85rem',
							fontWeight: 500,
							color: '#333',
							lineHeight: '125%',
						}}
					>
						stressed
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default FeelingsCard;
