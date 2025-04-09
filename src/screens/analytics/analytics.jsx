import React from "react";
import Menu from "../../components/Menu/menu";
import Header from "../../components/Header/header";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomIconButton from "../../components/Buttons/icon";
import FeelingsCard from "../../components/Cards/FeelingsCard";
import GoalProgressCard from "../../components/Cards/goal";
import { Typography, Container, Stack, Box } from "@mui/material";
import EmotionsLineChartCentered from "../../components/Charts/ChartsEmociones";
import ExpensesLineChart from "../../components/Charts/ChartsGastos";
import "./analytics.css";

function Analytics() {
  return (
    <div className="analytics-container">
      <Menu />
      <div className="analytics-content">
        <div className="analytics-header">
          <Header
            title="Analytics"
            subtitle="Set goals and look at your track record."
          />
          <div className="analytics-icons">
            <CustomIconButton icon={<AccountCircleIcon />} ariaLabel="user" />
            <CustomIconButton icon={<LogoutIcon />} ariaLabel="logout" />
          </div>
        </div>
        <Stack className="Chart-container">
          <div className="chart-Emocion">
            <EmotionsLineChartCentered />
          </div>
          <div className="chart-Expenses">
            <ExpensesLineChart />
          </div>
        </Stack>
        <div className="Analytics-cards">
          <Stack spacing={5}>
            <FeelingsCard compact={true} />
            <GoalProgressCard spent={150000} total={200000} compact={true} />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
