import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";
import "./emotions.css";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Skeleton from "@mui/material/Skeleton";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoodTracker from "../../components/Tables/mood";
import Menu from "../../components/Menu/menu";
import ImageCarousel from "../../components/Cards/imageCarousel";
import RecommendationDay from "../../components/Cards/recommendationDay";
import Header2 from "../../components/Header/header2";
import CustomIconButton from "../../components/Buttons/icon";
import MobileNavBar from "../../components/Menu/mobileNavBar";
import { useNavigate } from "react-router-dom";


function Emotions() {
  const [ultimaEmocion, setUltimaEmocion] = useState("");
  const uid = useSelector((state) => state.userId.id);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) return;

    const fetchLastEmotion = async () => {
      try {
        const journalsRef = collection(db, `users/${uid}/journals`);
        const q = query(journalsRef, orderBy("date", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          const traducciones = {
            feliz: "happy",
            triste: "sad",
            enojado: "angry",
            estresado: "stressed",
            confundido: "confused",
            ansioso: "anxious",
          };
          const emocionOriginal = data.emotion?.toLowerCase?.() || "";
          const emocionTraducida =
            traducciones[emocionOriginal] || emocionOriginal || "neutral";
          setUltimaEmocion(emocionTraducida);
        }
      } catch (error) {
        console.error("Error fetching last emotion:", error);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    fetchLastEmotion();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uid]);

  const goLogin = () => navigate("/log");
  const goSettings = () => navigate("/settings");

  return (
    <div className="emotions-container">
      {!isMobile && <Menu />}

      <div className="emotions-content">
        <div className="emotions-header">
          <Header2
            title="My emotions"
            subtitle="Look at your history of your emotions."
          />
          {!isMobile && (
            <div className="emotions-icons">
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

        <div className="emotions-main-grid">
          <div className="emotions-left">
            <MoodTracker />
          </div>
          <div className="emotions-right">
            {ultimaEmocion ? (
              <RecommendationDay emotion={ultimaEmocion} />
            ) : (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="14.875rem"
                sx={{ borderRadius: "1.5rem", backgroundColor: "#fdd1bc" }}
              />
            )}
            <div className="journal-carousel">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </div>

      {isMobile && <MobileNavBar />}
    </div>
  );
}

export default Emotions;
