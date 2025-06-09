import React, { useEffect, useState } from "react";
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";
import PeriodFilter from "../Filters/periodFilter";
import { LabelList } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";


const emotionMap = {
  happy: { emoji: "😄", value: 5 },
  sad: { emoji: "😭", value: 1 },
  nostalgic: { emoji: "😢", value: 2 },
  angry: { emoji: "😡", value: 0 },
  neutral: { emoji: "😑", value: 3 },
  stressed: { emoji: "😩", value: 4 },
};

export default function EmotionChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");
  const uid = useSelector((state) => state.userId.id);
  const [allJournals, setAllJournals] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [period, setPeriod] = useState("week");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      const journalsRef = collection(db, "users", uid, "journals");
      const querySnapshot = await getDocs(journalsRef);
      const data = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        if (d.date && d.emotion) {
          const date = d.date.toDate();
          data.push({ date, emotion: d.emotion });
        }
      });
      setAllJournals(data);
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    let filtered = [];
    if (period === "week") {
      const referenceDate = new Date(selectedDate);
      const day = referenceDate.getDay();
      const monday = new Date(referenceDate);
      monday.setDate(referenceDate.getDate() - ((day + 6) % 7));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      filtered = allJournals
        .filter((j) => {
          const journalDate = new Date(j.date);
          journalDate.setHours(0, 0, 0, 0);
          return journalDate >= monday && journalDate <= sunday;
        })
        .map((j) => ({
          day: j.date.toLocaleDateString("en-US", { weekday: "long" }),
          emotion: emotionMap[j.emotion]?.emoji,
          emotionValue: emotionMap[j.emotion]?.value,
          emotionName: j.emotion,
        }));
    } else if (period === "month") {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const grouped = {};
      allJournals.forEach((j) => {
        const d = j.date;
        if (d.getMonth() === month && d.getFullYear() === year) {
          const emo = j.emotion;
          grouped[emo] = (grouped[emo] || 0) + 1;
        }
      });

      filtered = Object.entries(grouped).map(([emotion, count]) => ({
        emotion: emotionMap[emotion]?.emoji,
        count,
      }));
    } else if (period === "year") {
      const year = selectedDate.getFullYear();
      const grouped = {};
      allJournals.forEach((j) => {
        const d = j.date;
        if (d.getFullYear() === year) {
          const month = d.getMonth();
          const emo = j.emotion;
          if (!grouped[month]) grouped[month] = {};
          grouped[month][emo] = (grouped[month][emo] || 0) + 1;
        }
      });

      filtered = Object.entries(grouped).map(([monthIndex, emotionCounts]) => {
        const topEmotion = Object.entries(emotionCounts).sort(
          (a, b) => b[1] - a[1]
        )[0][0];
        return {
          month: new Date(2025, parseInt(monthIndex)).toLocaleString(
            "default",
            { month: "short" }
          ),
          emotion: emotionMap[topEmotion]?.emoji,
          emotionValue: emotionMap[topEmotion]?.value,
        };
      });
    }

    setFilteredData(filtered);
  }, [period, selectedDate, allJournals]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: isSmallMobile
              ? "6px 8px"
              : isMobile
              ? "8px 12px"
              : "10px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontSize: isSmallMobile ? "11px" : isMobile ? "12px" : "14px",
            maxWidth: isSmallMobile ? "150px" : "200px",
          }}
        >
          <p
            style={{ margin: 0, fontWeight: "bold", color: "#49499d" }}
          >{`${label}`}</p>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: isSmallMobile ? "14px" : isMobile ? "16px" : "18px",
            }}
          >
            {`Emoción: ${data.emotion || "😐"}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxisTick = (value) => {
    const emotionEntry = Object.entries(emotionMap).find(
      ([key, data]) => data.value === value
    );
    return emotionEntry ? emotionEntry[1].emoji : "";
  };

  const formatXAxisTick = (value) => {
    if (period === "week" && isMobile) {
      const dayMap = {
        Monday: "Lun",
        Tuesday: "Mar",
        Wednesday: "Mié",
        Thursday: "Jue",
        Friday: "Vie",
        Saturday: "Sáb",
        Sunday: "Dom",
      };
      return dayMap[value] || value;
    }
    return value;
  };

  const getResponsiveConfig = () => {
    if (isSmallMobile) {
      return {
        chartHeight: {
          week: 280,
          month: 320,
          year: 350,
        },
        padding: "0.75rem",
        headerGap: "0.75rem",
        titleSize: "1rem",
        subtitleSize: "0.8rem",
        strokeWidth: 2,
        dotSize: 4,
        fontSize: "10px",
      };
    } else if (isMobile) {
      return {
        chartHeight: {
          week: 320,
          month: 380,
          year: 420,
        },
        padding: "1rem",
        headerGap: "1rem",
        titleSize: "1.1rem",
        subtitleSize: "0.85rem",
        strokeWidth: 2.5,
        dotSize: 5,
        fontSize: "11px",
      };
    } else {
      return {
        chartHeight: {
          week: 400,
          month: 480,
          year: 520,
        },
        padding: "1.5rem",
        headerGap: "1.5rem",
        titleSize: "1.5rem",
        subtitleSize: "1rem",
        strokeWidth: 3,
        dotSize: 6,
        fontSize: "12px",
      };
    }
  };

  const config = getResponsiveConfig();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: config.headerGap,
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: `0 ${isMobile ? "0.5rem" : "1rem"}`,
        }}
      >
        <h3
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: config.titleSize,
            fontWeight: 600,
            margin: 0,
            color: "#49499d",
            lineHeight: 1.2,
          }}
        >
          Emotion Tracking
        </h3>
        <p
          style={{
            fontSize: config.subtitleSize,
            color: "#000",
            margin: "0.25rem 0 0 0",
            lineHeight: 1.3,
          }}
        >
          Visualization of emotions by selected period
        </p>
      </div>

      <Box
        sx={{
          px: isMobile ? 1 : 2,
          "& .MuiFormControl-root": {
            minWidth: isSmallMobile ? "100px" : "120px",
          },
        }}
      >
        <PeriodFilter
          period={period}
          onPeriodChange={setPeriod}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          availableMonths={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          availableYears={[2023, 2024, 2025]}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: config.chartHeight[period],
          height: config.chartHeight[period],
          width: "100%",
          px: isMobile ? 0.5 : 1,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {period === "week" && (
            <LineChart
              data={filteredData}
              margin={{
                top: 20,
                right: isSmallMobile ? 10 : isMobile ? 15 : 20,
                left: isSmallMobile ? 10 : isMobile ? 15 : 20,
                bottom: isSmallMobile ? 10 : isMobile ? 15 : 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="day"
                tickFormatter={formatXAxisTick}
                fontSize={config.fontSize}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 60 : 40}
              />
              <YAxis
                domain={[0, 5]}
                tickFormatter={formatYAxisTick}
                ticks={[0, 1, 2, 3, 4, 5]}
                fontSize={config.fontSize}
                width={isSmallMobile ? 25 : 30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey="emotionValue"
                stroke="#49499D"
                strokeWidth={config.strokeWidth}
                dot={{ fill: "#49499D", strokeWidth: 2, r: config.dotSize }}
                activeDot={{
                  r: config.dotSize + 2,
                  stroke: "#49499D",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          )}

          {period === "month" && (
            <BarChart
              data={filteredData}
              barCategoryGap="20%"
              margin={{
                top: 30,
                right: isSmallMobile ? 10 : isMobile ? 15 : 20,
                left: isSmallMobile ? 10 : isMobile ? 15 : 20,
                bottom: isSmallMobile ? 10 : isMobile ? 15 : 20,
              }}
            >
              <XAxis dataKey="emotion" fontSize={config.fontSize} />
              <YAxis fontSize={config.fontSize} />
              <Tooltip
                formatter={(value) => [`${value}`, "Conteo"]}
                labelFormatter={(label) => `Emoción: ${label}`}
                contentStyle={{
                  fontSize: config.fontSize,
                  padding: isSmallMobile ? "6px 8px" : "8px 12px",
                }}
              />
              <Bar dataKey="count" fill="#49499d" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="emotion"
                  position="top"
                  fontSize={isSmallMobile ? "12px" : "14px"}
                />
              </Bar>
            </BarChart>
          )}

          {period === "year" && (
            <BarChart
              data={filteredData}
              barCategoryGap="15%"
              margin={{
                top: 30,
                right: isSmallMobile ? 10 : isMobile ? 15 : 20,
                left: isSmallMobile ? 10 : isMobile ? 15 : 20,
                bottom: isSmallMobile ? 10 : isMobile ? 15 : 20,
              }}
            >
              <XAxis
                dataKey="month"
                fontSize={config.fontSize}
                angle={isSmallMobile ? -30 : 0}
                textAnchor={isSmallMobile ? "end" : "middle"}
                height={isSmallMobile ? 50 : 40}
              />
              <YAxis fontSize={config.fontSize} />
              <Tooltip
                formatter={(value) => [`${value}`, "Intensidad"]}
                labelFormatter={(label, payload) => {
                  const emotion = payload?.[0]?.payload?.emotion || "";
                  return `Mes: ${label} | Emoción: ${emotion}`;
                }}
                contentStyle={{
                  fontSize: config.fontSize,
                  padding: isSmallMobile ? "6px 8px" : "8px 12px",
                }}
              />
              <Bar dataKey="emotionValue" fill="#49499D" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="emotion"
                  position="top"
                  fontSize={isSmallMobile ? "12px" : "14px"}
                />
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
