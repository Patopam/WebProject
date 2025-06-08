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

export default function ExpensesChart() {
  const [expensesData, setExpensesData] = useState([]);
  const uid = useSelector((state) => state.userId.id);
  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

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
          const date = data.date.toDate(); // Firestore Timestamp to JS Date
          const day = weekDays[date.getDay()];
          expensesMap[day] += data.amount;
        }
      });

      const processedData = weekDays.map((day) => ({
        day,
        expense: expensesMap[day],
      }));

      setExpensesData(processedData);
    };

    fetchData();
  }, [uid]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={expensesData}>
          <XAxis
            dataKey="day"
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
