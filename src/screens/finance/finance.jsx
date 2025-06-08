import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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
import MobileNavBar from "../../components/Menu/mobileNavBar";
import {
  evaluateGoalsStatus,
  getCompletedGoals,
  getFailedGoals,
} from "../../services/firebaseUtils";
import "./finance.css";

function Finance() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [useCarousel, setUseCarousel] = useState(window.innerWidth <= 1024);
  const uid = useSelector((state) => state.userId.id);
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);
      setUseCarousel(width > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!uid) return;

    evaluateGoalsStatus({ uid }).then(() => {
      getCompletedGoals({ uid }).then((goals) =>
        setCompletedCount(goals.length)
      );
      getFailedGoals({ uid }).then((goals) => setFailedCount(goals.length));
    });
  }, [uid, location]);

  const goLogin = () => navigate("/log");
  const goSettings = () => navigate("/settings");
  const handleSpendClick = () => {
    navigate("/finance/add-spending", { state: { from: "/finance" } });
  };

  const handleGoalClick = () => {
    navigate("/finance/add-goal");
  };

  return (
    <div className="finance-container">
      {!isMobile && <Menu />}
      <div className="finance-content">
        <div className="finance-header">
          <Header2 title="Finance" subtitle="Here you will find your stats." />
          {!isMobile && (
            <div className="finance-icons">
              <CustomIconButton
                icon={<AccountCircleIcon />}
                ariaLabel="user"
                onClick={goSettings}
              />
              <CustomIconButton
                icon={<LogoutIcon />}
                ariaLabel="logout"
                onClick={goLogin}
              />
            </div>
          )}
        </div>

        <div className="finance-buttons">
          <AddButton onClick={handleGoalClick} text={"Set new goal"} />
          <AddButton onClick={handleSpendClick} text={"Add spend"} />
        </div>

        <div className="finance-layout">
          <div className="finance-main">
            <div className="finance-left-column">
              {/* Carrusel SOLO para mobile/tablet (≤ 1024px) */}
              {isMobile && (
                <div className="finance-scroll-cards">
                  <div className="finance-card">
                    <GoalProgressCard />
                  </div>
                  <div className="finance-card">
                    <GoalStatsCard
                      title="Goals completed"
                      description="You have successfully completed a total of"
                      quantity={completedCount}
                      label="goals"
                      bgColor="#C7DDF9"
                      iconBg="#85A9E8"
                    />
                  </div>
                  <div className="finance-card">
                    <GoalStatsCard
                      title="Goals failed"
                      description="You have failed a total of"
                      quantity={failedCount}
                      label="goals"
                      bgColor="#F7C8B6"
                      iconBg="#E68067"
                    />
                  </div>
                </div>
              )}

              <GoalHistoryTable />
              <ExpenditureHistoryTable />
            </div>

            {/* Stats SOLO en desktop (> 1024px) */}
            {!isMobile && (
              <div className="finance-right-column">
                <div className="goal-progress-placeholder">
                  <GoalProgressCard />
                </div>

                <div className="stats-cards">
                  <GoalStatsCard
                    title="Goals completed"
                    description="You have successfully completed a total of"
                    quantity={completedCount}
                    label="goals"
                    bgColor="#C7DDF9"
                    iconBg="#85A9E8"
                  />

                  <GoalStatsCard
                    title="Goals failed"
                    description="You have failed a total of"
                    quantity={failedCount}
                    label="goals"
                    bgColor="#F7C8B6"
                    iconBg="#E68067"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isMobile && <MobileNavBar />}
    </div>
  );
}

export default Finance;
