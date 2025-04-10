import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/menu";
import AddButton from "../../components/Buttons/add";
import Header2 from "../../components/Header/header2";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomIconButton from "../../components/Buttons/icon";
import GoalStatsCard from "../../components/Cards/goalStatsCard ";
import GoalHistoryTable from "../../components/Tables/goalHistoryTable";
import GoalProgressCard from "../../components/Cards/goal";
import ExpenditureHistoryTable from "../../components/Tables/expenditureHistoryTable";
import { goalsSummary } from "../../Data/goalData";
import { expenditureData } from "../../Data/expensesData";
import { goalHistoryData } from "../../Data/goalData";
import "./finance.css";
import EditInput from "../../components/Inputs/EditInput";

function Finance() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/log");
  };
  const handleSpendClick = () => {
    navigate("/finance/add-spending");
  };

  const handleGoalClick = () => {
    navigate("/finance/add-goal");
  };
  return (
    <div className="finance-container">
      <Menu />
      <div className="finance-content">
        <div className="finance-header">
          <Header2 title="Finance" subtitle="Here you will find your stats." />
          <div className="finance-icons">
            <CustomIconButton icon={<AccountCircleIcon />} ariaLabel="user" />
            <CustomIconButton
              icon={<LogoutIcon />}
              ariaLabel="logout"
              onClick={goLogin}
            />
          </div>
        </div>
        <div className="finance-buttons">
          <AddButton onClick={handleGoalClick} text={"Set new goal"} />
          <AddButton onClick={handleSpendClick} text={"Add spend"} />
        </div>

        <div className="finance-layout">
          <div className="finance-main">
            <div className="finance-left-column">
              <GoalHistoryTable data={goalHistoryData} />
              <ExpenditureHistoryTable data={expenditureData} />
            </div>

            <div className="finance-right-column">
              <div className="goal-progress-placeholder">
                <GoalProgressCard
                  spent={150000}
                  total={200000}
                  compact={true}
                />
              </div>

              <div className="stats-cards">
                {goalsSummary.map((goal, index) => (
                  <GoalStatsCard
                    key={index}
                    title={goal.title}
                    description={goal.description}
                    quantity={goal.quantity}
                    label={goal.label}
                    bgColor={goal.bgColor}
                    iconBg={goal.iconBg}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finance;
