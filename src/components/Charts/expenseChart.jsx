import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./expenseChart.css";

export default function ExpensesChart() {
  const [expensesData, setExpensesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const uid = useSelector((state) => state.userId.id);

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      setIsLoading(true);
      try {
        const SpendsRef = collection(db, "users", uid, "Spends");
        const querySnapshot = await getDocs(SpendsRef);

        const weekDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const expensesMap = {
          Sunday: 0,
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
        };

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.date && data.amount) {
            const date = data.date.toDate();
            const day = weekDays[date.getDay()];
            expensesMap[day] += data.amount;
          }
        });

        const processedData = weekDays.map((day, index) => ({
          day: isMobile ? weekDaysShort[index] : day,
          fullDay: day,
          expense: expensesMap[day],
        }));

        setExpensesData(processedData);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uid, isMobile]);

  // Tooltip personalizado mejorado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const displayDay = data.fullDay || label;

      return (
        <div className="tooltip">
          <p className="tooltip-label">{displayDay}</p>
          <p className="tooltip-value">
            Gastos:{" "}
            <span className="amount">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Configuración dinámica basada en el tamaño de pantalla
  const getChartConfig = () => {
    if (window.innerWidth <= 480) {
      return {
        margin: { top: 10, right: 10, left: 10, bottom: 10 },
        fontSize: 10,
        strokeWidth: 2,
        dotSize: 3,
        activeDotSize: 5,
      };
    } else if (window.innerWidth <= 768) {
      return {
        margin: { top: 15, right: 15, left: 15, bottom: 15 },
        fontSize: 12,
        strokeWidth: 2.5,
        dotSize: 4,
        activeDotSize: 6,
      };
    } else {
      return {
        margin: { top: 20, right: 30, left: 20, bottom: 20 },
        fontSize: 16,
        strokeWidth: 3,
        dotSize: 5,
        activeDotSize: 7,
      };
    }
  };

  const chartConfig = getChartConfig();

  if (isLoading) {
    return (
      <div className="chart-container-Spends">
        <div className="chart-header">
          <h3 className="chart-title">Weekly Expenses</h3>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container-Spends">
      <div className="chart-header">
        <h3 className="chart-title">Weekly Expenses</h3>
        <p className="chart-subtitle">Tracking expenses by day of the week</p>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={expensesData} margin={chartConfig.margin}>
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#49499d" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#666"
              fontSize={chartConfig.fontSize}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#666", fontSize: chartConfig.fontSize }}
              interval={0}
            />
            <YAxis
              stroke="#666"
              fontSize={chartConfig.fontSize}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#666", fontSize: chartConfig.fontSize }}
              tickFormatter={(value) =>
                isMobile && value >= 1000
                  ? `$${(value / 1000).toFixed(0)}k`
                  : `$${value.toLocaleString()}`
              }
              width={isMobile ? 40 : 60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#49499d"
              strokeWidth={chartConfig.strokeWidth}
              dot={{
                r: chartConfig.dotSize,
                fill: "#49499d",
                strokeWidth: 2,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: chartConfig.activeDotSize,
                fill: "#49499d",
                strokeWidth: 2,
                stroke: "#ffffff",
                filter: "drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

}
