import React from "react";
import Menu from "../../components/Menu/menu";
import Header2 from "../../components/Header/header2";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomIconButton from "../../components/Buttons/icon";
import "./calendar.css";
import { useNavigate } from "react-router-dom";
function Calendar() {
  let navigate = useNavigate();
  const goLogin = () => {
    navigate("/log");
  };
  return (
    <div className="calendar-container">
      <Menu />
      <div className="calendar-content">
        <div className="calendar-header">
          <Header2
            title="My calendar"
            subtitle="Calendar view of your emotions."
          />
          <div className="calendar-icons">
            <CustomIconButton icon={<AccountCircleIcon />} ariaLabel="user" />
            <CustomIconButton
              icon={<LogoutIcon />}
              ariaLabel="logout"
              onClick={goLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
