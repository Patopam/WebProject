import { Box, MenuItem, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MonthFilter = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, availableYears }) => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Agu', 'Jul', 'Sep', 'Oct', 'Nov', 'Dic'];

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '8px',
				alignItems: 'center',
			}}
		>
			<Select
				value={selectedYear}
				onChange={(e) => setSelectedYear(Number(e.target.value))}
				IconComponent={ExpandMoreIcon}
				size='small'
				sx={{
					width: '5rem',
					height: '2.5rem',
					borderRadius: '999px',
					background: '#5F5DA6',
					color: '#fff',
					fontFamily: "'Manrope', sans-serif",
					fontSize: '14px',
					fontWeight: 500,
					textAlign: 'center',
					'.MuiOutlinedInput-notchedOutline': { border: 'none' },
					'&:hover': { background: '#4B4990' },
					'& .MuiSelect-icon': {
						color: '#fff',
						right: '10px',
					},
					'@media (max-width: 767px)': {
						width: '3.8rem',
						height: '1.8rem',
						padding: '5px 3px',
						fontSize: '13px',
						borderRadius: '14px',
					},
				}}
			>
				{availableYears.map((year) => (
					<MenuItem key={year} value={year}>
						{year}
					</MenuItem>
				))}
			</Select>

			<Box
				component='button'
				onClick={() => setSelectedMonth('All')}
				sx={{
					display: 'flex',
					width: '5rem',
					height: '2.5rem',
					padding: '6px 24px',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: '999px',
					background: selectedMonth === 'All' ? '#4B4990' : '#5F5DA6',
					color: '#fff',
					border: 'none',
					cursor: 'pointer',
					fontFamily: "'Manrope', sans-serif",
					fontSize: '14px',
					fontWeight: 500,
					'&:hover': {
						background: '#4B4990',
					},
					'@media (max-width: 767px)': {
						width: '3.8rem',
						height: '1.8rem',
						padding: '5px 12px',
						fontSize: '13px',
						borderRadius: '14px',
					},
				}}
			>
				All
			</Box>

			{months.map((month) => (
				<Box
					key={month}
					component='button'
					onClick={() => setSelectedMonth(month)}
					sx={{
						display: 'flex',
						width: '5rem',
						height: '2.5rem',
						padding: '6px 24px',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '999px',
						background: selectedMonth === month ? '#4B4990' : '#5F5DA6',
						color: '#fff',
						border: 'none',
						cursor: 'pointer',
						fontFamily: "'Manrope', sans-serif",
						fontSize: '14px',
						fontWeight: 500,
						'&:hover': {
							background: '#4B4990',
						},
						'@media (max-width: 767px)': {
							width: '3.8rem',
							height: '1.8rem',
							padding: '5px 12px',
							fontSize: '13px',
							borderRadius: '14px',
						},
					}}
				>
					{month}
				</Box>
			))}
		</Box>
	);
};

export default MonthFilter;
