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
  const uid = useSelector((state) => state.userId.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      setIsLoading(true);
      try {
        const SpendsRef = collection(db, "users", uid, "Spends");
        const querySnapshot = await getDocs(SpendsRef);

        const weekDays = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ];
        const expensesMap = {
          Domingo: 0,
          Lunes: 0,
          Martes: 0,
          Miércoles: 0,
          Jueves: 0,
          Viernes: 0,
          Sábado: 0,
        };

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.date && data.amount) {
            const date = data.date.toDate();
            const day = weekDays[date.getDay()];
            expensesMap[day] += data.amount;
          }
        });

        const processedData = weekDays.map((day) => ({
          day,
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
  }, [uid]);

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            Gastos:{" "}
            <span className="amount">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="chart-container-Spends">
        <div className="chart-header">
          <h3 className="chart-title">Gastos Semanales</h3>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container-Spends">
      <div className="chart-header">
        <h3 className="chart-title">Gastos Semanales</h3>
        <p className="chart-subtitle">
          Seguimiento de gastos por día de la semana
        </p>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={expensesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 16 }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6b7280", fontSize: 16 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#3b82f6",
                strokeWidth: 2,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: 7,
                fill: "#1d4ed8",
                strokeWidth: 3,
                stroke: "#ffffff",
                filter: "drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
