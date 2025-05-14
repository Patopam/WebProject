import React from "react";
import { SentimentSatisfiedAlt } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchJournal } from "../../services/firebaseUtils";
const EmotionWeek = ({ compact = false, Data }) => {
  const emotionToEmoji = {
    happy: "😄",
    angry: "😡",
    sad: "😭",
    stressed: "😩",
    nostalgic: "😢",
    neutral: "😑",
  };

  const sortedData = Data.sort((a, b) => a.date.seconds - b.date.seconds);

  const uniqueByDay = [];
  const seenDays = new Set();

  for (const entry of sortedData) {
    const dateObj = new Date(entry.date.seconds * 1000);
    const dateKey = dateObj.toDateString();

    if (!seenDays.has(dateKey)) {
      seenDays.add(dateKey);
      uniqueByDay.push(entry);
    }
  }

  const transformedWeekData = uniqueByDay.map((entry) => {
    const dateObj = new Date(entry.date.seconds * 1000);
    return {
      day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: dateObj.getDate(),
      emoji: emotionToEmoji[entry.emotion] || "❓",
    };
  });
  console.log(transformedWeekData);
  const containerStyle = {
    display: "flex",
    width: compact ? "100%" : "100%",
    maxWidth: compact ? "26.75rem" : "40rem", // Equivalente a 428px y 544px
    height: "22.5rem", // Altura automática basada en el contenido
    padding: compact
      ? "1.75rem 1.75rem 3.3rem 1.75rem"
      : "1.75rem 1.75rem 4.2rem 1.75rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: compact ? "2.46rem" : "3.13rem",
    borderRadius: "1.5rem",
    background: "#E3E9CF",
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
  };

  const iconContainerStyle = {
    width: "2.31rem", // 37px
    height: "2.31rem", // 37px
    borderRadius: "50%",
    backgroundColor: "#C8D39F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const titleStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "1.125rem", // 18px
    fontWeight: 300,
    color: "#333",
    lineHeight: "normal",
    fontStyle: "normal",
  };

  const dayRowStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  };

  const dayColumnStyle = {
    width: compact ? "13%" : "13%", // Porcentaje del contenedor padre
    minWidth: compact ? "2.6rem" : "3.3rem", // Mínimo equivalente a 41.7px y 53px
    height: "auto", // Altura automática
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: compact ? "1.25rem 0.625rem" : "1.875rem 1.25rem",
    borderRadius: "1.875rem",
    backgroundColor: "#C8D39F",
    boxSizing: "border-box",
    aspectRatio: compact ? "41.7/118.01" : "53/150",
  };

  const dayTextStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "1rem", // 16px
    fontWeight: 500,
    color: "#333",
    lineHeight: "110%",
    fontStyle: "normal",
    marginBottom: "0.5rem",
  };

  const dayNumberStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "1.25rem", // 20px
    fontWeight: 500,
    color: "#333",
    lineHeight: "110%",
    fontStyle: "normal",
    margin: "0.5rem 0",
  };

  const emojiStyle = {
    fontSize: compact ? "1.5rem" : "2rem", // 24px o 32px
    marginTop: "0.5rem",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={iconContainerStyle}>
          <SentimentSatisfiedAlt
            style={{ fontSize: "1.5rem", color: "#333" }}
          />
        </div>
        <div style={titleStyle}>Emotion week</div>
      </div>

      <div style={dayRowStyle}>
        {transformedWeekData.map((item, index) => (
          <div key={index} style={dayColumnStyle}>
            <div style={dayTextStyle}>{item.day}</div>
            <div style={dayNumberStyle}>{item.dayNum}</div>
            <div style={emojiStyle}>{item.emoji}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionWeek;
