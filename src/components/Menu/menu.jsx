import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import Logo from "../../assets/logo.png";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-logo">
        <img src={Logo} alt="Sense Logo" className="menu-logo-img" />
      </div>

      <div className="menu-section">
        <p className="section-title">MAIN</p>
        <ul>
          <li>
            <Link to="/dashboard" className="menu-item-link">
              <HomeOutlinedIcon />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/journal" className="menu-item-link">
              <PersonOutlineOutlinedIcon />
              <span>Journal</span>
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="menu-item-link">
              <CalendarTodayOutlinedIcon />
              <span>Calendar</span>
            </Link>
          </li>
          <li>
            <Link to="/analytics/" className="menu-item-link">
              <LeaderboardOutlinedIcon />
              <span>Analytics</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menu-section">
        <p className="section-title">ACTIVITY</p>
        <ul>
          <li>
            <Link to="/emotions" className="menu-item-link">
              <TagFacesOutlinedIcon />
              <span>My emotions</span>
            </Link>
          </li>
          <li>
            <Link to="/finance" className="menu-item-link">
              <AttachMoneyOutlinedIcon />
              <span>Finance</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menu-section">
        <p className="section-title">SETTINGS</p>
        <ul>
          <li>
            <Link to="/notifications" className="menu-item-link">
              <NotificationsActiveOutlinedIcon />
              <span>Notifications</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="menu-item-link">
              <SettingsOutlinedIcon />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
