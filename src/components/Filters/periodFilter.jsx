import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
    const offset = direction === "prev" ? -1 : 1;
    const newDate = new Date(selectedDate);
    if (period === "week") newDate.setDate(newDate.getDate() + offset * 7);
    if (period === "month") newDate.setMonth(newDate.getMonth() + offset);
    if (period === "year") newDate.setFullYear(newDate.getFullYear() + offset);
    onDateChange(newDate);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={() => handlePeriodSelect("week")}
          variant={period === "week" ? "contained" : "outlined"}
          sx={{
            backgroundColor: period === "week" ? "#49499d" : "transparent",
            borderColor: "#49499d",
            color: period === "week" ? "white" : "#49499d",
            "&:hover": {
              backgroundColor: period === "week" ? "#3a3a7a" : "#49499d20",
              borderColor: "#49499d",
            },
          }}
        >
          Week
        </Button>
        <Button
          onClick={() => handlePeriodSelect("month")}
          variant={period === "month" ? "contained" : "outlined"}
          sx={{
            backgroundColor: period === "month" ? "#49499d" : "transparent",
            borderColor: "#49499d",
            color: period === "month" ? "white" : "#49499d",
            "&:hover": {
              backgroundColor: period === "month" ? "#3a3a7a" : "#49499d20",
              borderColor: "#49499d",
            },
          }}
        >
          Month
        </Button>
        <Button
          onClick={() => handlePeriodSelect("year")}
          variant={period === "year" ? "contained" : "outlined"}
          sx={{
            backgroundColor: period === "year" ? "#49499d" : "transparent",
            borderColor: "#49499d",
            color: period === "year" ? "white" : "#49499d",
            "&:hover": {
              backgroundColor: period === "year" ? "#3a3a7a" : "#49499d20",
              borderColor: "#49499d",
            },
          }}
        >
          Year
        </Button>
      </ButtonGroup>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={() => handleDateOffset("prev")}
          sx={{
            color: "#49499d",
            "&:hover": {
              backgroundColor: "#49499d20",
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        {period === "week" && (
          <Typography variant="body2">
            Semana de {selectedDate.toLocaleDateString()}
          </Typography>
        )}
        {period === "month" && (
          <Select
            size="small"
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

        {period === "year" && (
          <Select
            size="small"
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
        <IconButton
          onClick={() => handleDateOffset("next")}
          sx={{
            color: "#49499d",
            "&:hover": {
              backgroundColor: "#49499d20",
            },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
export default PeriodFilter;
