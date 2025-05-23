import { Box, Button, ButtonGroup, IconButton, MenuItem, Select, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PeriodFilter = ({
	period,
	onPeriodChange,
	selectedDate,
	onDateChange,
	availableMonths = [],
	availableYears = [],
}) => {
	const handlePeriodSelect = (newPeriod) => {
		onPeriodChange(newPeriod);
	};

	const handleDateOffset = (direction) => {
		const offset = direction === 'prev' ? -1 : 1;
		const newDate = new Date(selectedDate);
		if (period === 'week') newDate.setDate(newDate.getDate() + offset * 7);
		if (period === 'month') newDate.setMonth(newDate.getMonth() + offset);
		if (period === 'year') newDate.setFullYear(newDate.getFullYear() + offset);
		onDateChange(newDate);
	};

	return (
		<Box display='flex' flexDirection='column' alignItems='start' gap={1}>
			<ButtonGroup variant='outlined' size='small'>
				<Button onClick={() => handlePeriodSelect('week')} variant={period === 'week' ? 'contained' : 'outlined'}>
					Week
				</Button>
				<Button onClick={() => handlePeriodSelect('month')} variant={period === 'month' ? 'contained' : 'outlined'}>
					Month
				</Button>
				<Button onClick={() => handlePeriodSelect('year')} variant={period === 'year' ? 'contained' : 'outlined'}>
					Year
				</Button>
			</ButtonGroup>
			<Box display='flex' alignItems='center' gap={1}>
				<IconButton onClick={() => handleDateOffset('prev')}>
					<ArrowBackIosNewIcon fontSize='small' />
				</IconButton>
				{period === 'week' && <Typography variant='body2'>Semana de {selectedDate.toLocaleDateString()}</Typography>}
				{period === 'month' && (
					<Select
						size='small'
						value={selectedDate.getMonth()}
						onChange={(e) => {
							const newDate = new Date(selectedDate);
							newDate.setMonth(e.target.value);
							onDateChange(newDate);
						}}
					>
						{availableMonths.map((month, index) => (
							<MenuItem key={month} value={index}>
								{month}
							</MenuItem>
						))}
					</Select>
				)}

				{period === 'year' && (
					<Select
						size='small'
						value={selectedDate.getFullYear()}
						onChange={(e) => {
							const newDate = new Date(selectedDate);
							newDate.setFullYear(e.target.value);
							onDateChange(newDate);
						}}
					>
						{availableYears.map((year) => (
							<MenuItem key={year} value={year}>
								{year}
							</MenuItem>
						))}
					</Select>
				)}
				<IconButton onClick={() => handleDateOffset('next')}>
					<ArrowForwardIosIcon fontSize='small' />
				</IconButton>
			</Box>
		</Box>
	);
};

export default PeriodFilter;
