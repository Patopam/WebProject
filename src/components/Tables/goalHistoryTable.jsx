import { useState, useEffect } from "react";
import { AttachMoney, ArrowDropDown, CalendarToday } from "@mui/icons-material";
import { fetchGoal } from "../../services/firebaseUtils";
import { useSelector } from "react-redux";

const GoalHistoryCard = () => {
  const id = useSelector((state) => state.userId.id);
  const [selectedTime, setSelectedTime] = useState("Today");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);

  const timeOptions = ["Today", "Week", "Month"];
  const statusOptions = ["All", "Completed", "Failed"];

  useEffect(() => {
    fetchGoal({ uid: id })
      .then((Goals) => {
        const sorted = [...Goals].sort(
          (a, b) => b.startDate?.seconds - a.startDate?.seconds
        );
        setData(sorted);
        setFilteredData(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!Data) return;

    const now = new Date();
    let filtered = [...Data];

    if (selectedTime === "Today") {
      filtered = filtered.filter((item) => {
        const date = item.startDate?.toDate();
        return (
          date?.getDate() === now.getDate() &&
          date?.getMonth() === now.getMonth() &&
          date?.getFullYear() === now.getFullYear()
        );
      });
    } else if (selectedTime === "Week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      filtered = filtered.filter((item) => {
        const date = item.startDate?.toDate();
        return date >= startOfWeek && date <= now;
      });
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (item) => item.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    setFilteredData(filtered);
  }, [selectedTime, selectedStatus, Data]);

  return (
    <div>
      {Loading ? (
        <p>Loading...</p>
      ) : (
        <div style={containerStyle}>
          <div style={headerStyle}>
            <div style={iconContainerStyle}>
              <AttachMoney style={{ fontSize: "1rem", color: "#333" }} />
            </div>
            <div style={headerTitleStyle}>Goal History</div>
          </div>

          <div style={filterWrapperStyle}>
            <div style={filterGroupStyle}>
              {timeOptions.map((option) => (
                <span
                  key={option}
                  onClick={() => setSelectedTime(option)}
                  style={{
                    textDecoration:
                      selectedTime === option ? "underline" : "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {option} <ArrowDropDown fontSize="small" />
                </span>
              ))}
              {selectedTime === "Month" && (
                <CalendarToday sx={{ color: "#333", fontSize: "1.2rem" }} />
              )}
            </div>

            <div style={filterGroupStyle}>
              {statusOptions.map((option) => (
                <span
                  key={option}
                  onClick={() => setSelectedStatus(option)}
                  style={{
                    textDecoration:
                      selectedStatus === option ? "underline" : "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          <div style={scrollWrapperStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Start Date</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>End Date</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {FilteredData.map((goal) => (
                  <tr key={goal.id}>
                    <td style={tdStyle}>
                      {goal.startDate?.toDate().toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>
                      ${Number(goal.amount).toLocaleString("es-CO")}
                    </td>
                    <td style={tdStyle}>
                      {goal.endDate?.toDate().toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{goal.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalHistoryCard;

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "320px",
  minHeight: "320px",
  padding: "1.5rem",
  borderRadius: "1.5rem",
  backgroundColor: "#FCE2A9",
  boxSizing: "border-box",
  fontFamily: "'Manrope', sans-serif",
  overflow: "hidden",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "1rem",
};

const iconContainerStyle = {
  width: "2rem",
  height: "2rem",
  borderRadius: "50%",
  backgroundColor: "#FACD69",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const headerTitleStyle = {
  fontSize: "0.95rem",
  fontWeight: 400,
  color: "#333",
};

const filterWrapperStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  backgroundColor: "#FBD788",
  borderRadius: "0.75rem",
  padding: "0.4rem 1rem",
  marginBottom: "0.8rem",
  fontSize: "clamp(0.65rem, 1.3vw, 0.85rem)",
  flexWrap: "wrap",
  gap: "0.5rem",
  minHeight: "2.5rem",
};

const filterGroupStyle = {
  display: "flex",
  gap: "clamp(0.3rem, 1vw, 0.6rem)",
  fontWeight: 600,
  color: "#333",
  flexWrap: "wrap",
  alignItems: "center",
  flex: "0 1 auto",
};

const scrollWrapperStyle = {
  overflowY: "auto",
  maxHeight: "200px",
  paddingRight: "0.5rem",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0.4rem 0.6rem",
  fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
};

const thStyle = {
  textAlign: "left",
  fontWeight: 600,
  color: "#333",
  padding: "0 0.3rem",
};

const tdStyle = {
  backgroundColor: "white",
  padding: "0.6rem 0.6rem",
  borderRadius: "0.6rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
};
