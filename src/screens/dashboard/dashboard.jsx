import React from "react";
import AddButton from "../../components/Buttons/add";
import Header from "../../components/Header/header";
import ReminderCard from "../../components/Cards/remainder";
import GoalProgressCard from "../../components/Cards/goal";
import EmotionWeek from "../../components/Cards/emotionWeek";
import CustomIconButton from "../../components/Buttons/icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import FeelingsCard from "../../components/Cards/FeelingsCard";
import Menu from "../../components/Menu/menu";
import ExpensesTable from "../../components/Tables/expensesTable";
import expensesData from "../../Data/expensesData";
import "./style.css";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataSpends } from "../../redux/DataSlice/DataSpends";
import { fetchJournal } from "../../services/firebaseUtils";
function Dashboard() {
  const [Data, setData] = useState();
  const [Loading, setLoading] = useState(true);
  const id = useSelector((state) => state.userId.id);
  const NombreU = useSelector((state) => state.NombreU.Nombre);
  useEffect(() => {
    fetchJournal({ uid: id })
      .then((Emotion) => setData([...Emotion]))
      .finally(() => setLoading(false));
  }, []);

  let navigate = useNavigate();
  const goLogin = () => {
    navigate("/log");
  };

  const handleJournalClick = () => {
    console.log("Daily journal clicked");
    navigate("/journal/write");
  };

  const handleSpendClick = () => {
    console.log("Add spend clicked");
    navigate("/finance/add-spending");
  };
  const goSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <Header
            Nombre={NombreU}
            subtitle="How are you feeling today?"
            emoji="😊"
          />
          <div className="dashboard-icons">
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
        </div>

        <div className="dashboard-buttons">
          <AddButton onClick={handleJournalClick} text={"Daily journal"} />
          <AddButton onClick={handleSpendClick} text={"Add spend"} />
        </div>

        {/* Top row with three equal cards */}
        <div className="dashboard-cards-row">
          <ReminderCard />
          <FeelingsCard />
          <GoalProgressCard />
        </div>

        {/* Bottom row with expenses table on left and emotion week on right */}
        <div className="dashboard-bottom-row">
          <div className="expenses-container">
            <ExpensesTable dashboard={true} />
          </div>
          {Loading ? (
            <p> Loading</p>
          ) : (
            <div className="emotion-container">
              <EmotionWeek dashboard={true} Data={Data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
