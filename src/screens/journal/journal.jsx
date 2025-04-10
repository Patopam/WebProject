import React from "react";
import Menu from "../../components/Menu/menu";
import Header from "../../components/Header/header";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomIconButton from "../../components/Buttons/icon";
import "./journal.css";
import JournalForm from "../../components/Journal/journalForms";
import ReminderCard from "../../components/Cards/remainder";
import ImageCarousel from "../../components/Cards/imageCarousel";
import { useNavigate } from "react-router-dom";
function Journal() {
  let navigate = useNavigate();
  const goLogin = () => {
    navigate("/log");
  };
  return (
    <div className="journal-container">
      <Menu />
      <div className="journal-content">
        <div className="journal-header">
          <Header
            title="My journal"
            subtitle="Write your thoughts of the day."
          />
          <div className="journal-icons">
            <CustomIconButton icon={<AccountCircleIcon />} ariaLabel="user" />
            <CustomIconButton
              icon={<LogoutIcon />}
              ariaLabel="logout"
              onClick={goLogin}
            />
          </div>
        </div>

        <div className="journal-view">
          <JournalForm compact />
        </div>
        <div className="remainders-cards">
          <ReminderCard />
        </div>
        <div className="carousel-card">
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
}

export default Journal;
