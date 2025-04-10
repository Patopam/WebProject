import React from "react";
import { Typography, Container, Stack, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExpensesLineChart() {
  const styleText = {
    Linea: {
      color: "var(--Neutral-1000, #333)",
      fontFamily: "Manrope, sans-serif",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      color: "#000000",
      marginTop: "20px",
      textAlign: "center",
    },
    Titulo: {
      color: "var(--Neutral-1000, #333)",
      fontFamily: "Manrope, sans-serif",
      fontWeight: 400,
      color: "#000000",
      marginTop: "20px",
      textAlign: "center",
    },
  };
  // Datos de gastos para la semana
  const expensesData = [
    { day: "Lunes", expense: 51 },
    { day: "Martes", expense: 13 },
    { day: "Miércoles", expense: 8 },
    { day: "Jueves", expense: 70 },
    { day: "Viernes", expense: 34 },
    { day: "Sábado", expense: 22 },
    { day: "Domingo", expense: 18 },
  ];

  // Personalización del tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm">{`${payload[0].payload.day}: $${payload[0].payload.expense}`}</p>
        </div>
      );
    }
    return null;
  };

  // Punto personalizado
  const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill="#49499D"
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  return (
    <div>
      <Typography variant="h4" sx={styleText.Titulo}>
        Gastos Semanales
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          width={600}
          height={300}
          data={expensesData}
          margin={{ top: 20, right: 40, left: 30, bottom: 5 }}
          style={styleText.Linea}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" height={30} />
          <YAxis
            domain={[0, 80]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="expense"
            name="Gasto"
            stroke="#49499D"
            strokeWidth={4}
            dot={<CustomDot />}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
