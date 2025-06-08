import { useEffect, useState } from "react";
import Menu from "../../components/Menu/menu";
import Header2 from "../../components/Header/header2";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomIconButton from "../../components/Buttons/icon";
import FeelingsCard from "../../components/Cards/FeelingsCard";
import GoalProgressCard from "../../components/Cards/goal";
import EmotionsLineChartCentered from "../../components/Charts/emotionChart";
import ExpensesLineChart from "../../components/Charts/expenseChart";
import MobileNavBar from "../../components/Menu/mobileNavBar";
import "./analytics.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getEmotionSpendingStats } from "../../services/analysisUtils";

function Analytics() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [emotionStats, setEmotionStats] = useState(null);

  const uid = useSelector((state) => state.userId.id);
  const navigate = useNavigate();

  const goLogin = () => navigate("/log");
  const goSettings = () => navigate("/settings");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (uid) {
      getEmotionSpendingStats(uid).then(setEmotionStats);
    }
  }, [uid]);

  return (
    <div className="analytics-container">
      {!isMobile && <Menu />}
      <div className="analytics-content">
        <div className="analytics-header">
          <Header2
            title="Analytics"
            subtitle="Set goals and look at your track record."
          />
          {!isMobile && (
            <div className="analytics-icons">
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

        <div className="main-layout">
          <div className="charts-section">
            <div className="chart-container">
              <div className="chart-Emocion">
                <EmotionsLineChartCentered />
              </div>
              <div className="chart-Expenses">
                <ExpensesLineChart />
              </div>
            </div>
          </div>
          <div className="cards-section">
            <div className="card-item">
              {emotionStats ? (
                <FeelingsCard
                  emotion={emotionStats.emotion}
                  percentage={emotionStats.percentage}
                />
              ) : (
                <FeelingsCard emotion="none" percentage={0} />
              )}
            </div>
            <div className="card-item">
              <GoalProgressCard />
            </div>
          </div>
        </div>
      </div>
      {isMobile && <MobileNavBar />}
    </div>
  );
}

export default Analytics;
