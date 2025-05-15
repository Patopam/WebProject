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
import MobileNavBar from "../../components/Menu/mobileNavBar"; // Importamos la barra de navegación móvil
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showButtons, setShowButtons] = useState(true);

  const id = useSelector((state) => state.userId.id);
  const NombreU = useSelector((state) => state.NombreU.Nombre);
  useEffect(() => {
    fetchJournal({ uid: id })
      .then((Emotion) => setData([...Emotion]))
      .finally(() => setLoading(false));

    // Función para actualizar el estado de isMobile cuando cambia el tamaño de la ventana
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      setShowButtons(!mobile); // Siempre mostrar botones en desktop
    };

    // Llamar handleResize una vez para inicializar correctamente
    handleResize();

    // Agregar event listener para el cambio de tamaño
    window.addEventListener("resize", handleResize);

    // Definir un punto de entrada para el observador de intersección
    const handleIntersection = (entries) => {
      // Si la navbar está visible (intersecting), ocultar los botones
      if (entries[0].isIntersecting) {
        setShowButtons(false);
      } else {
        // Si estamos en móvil pero la navbar no es visible, mostrar los botones
        setShowButtons(isMobile);
      }
    };

    // Crear un observador para la barra de navegación móvil
    if (isMobile) {
      const navbarElement = document.querySelector(".mobile-navbar");
      if (navbarElement) {
        const observer = new IntersectionObserver(handleIntersection, {
          threshold: 0.1, // Disparar cuando al menos el 10% de la navbar es visible
        });
        observer.observe(navbarElement);

        // Limpiar observador
        return () => {
          observer.disconnect();
        };
      }
    }

    // Limpiar event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

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
      {/* Mostrar el menú lateral solo en pantallas grandes */}
      {!isMobile && <Menu />}

      <div className="dashboard-content">
        {/* Mobile/iPad icons above header - solo mostrar si showButtons es true */}
        {isMobile && showButtons && (
          <div className="dashboard-mobile-icons">
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

        <div className="dashboard-header">
          <Header Nombre={NombreU} subtitle="How are you feeling today?" />
          {/* Desktop icons - only show on non-mobile */}
          {!isMobile && (
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
          )}
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
            <ExpensesTable data={expensesData} dashboard={true} />
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

      {/* Mostrar la barra de navegación móvil solo en pantallas pequeñas y medianas */}
      {isMobile && <MobileNavBar />}
    </div>
  );
}

export default Dashboard;
