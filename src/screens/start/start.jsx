import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/buttonStart";
import Logo from "../../assets/logoStart.png";
import BotonStartGoogle from "../../components/Buttons/buttonStartGoogle";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./start.css";
import { useMediaQuery } from "@mui/material";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";
import { saveUserData } from "../../services/firebaseUtils";
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/UserSlice/UserSlice";
import { setUserName } from "../../redux/UserSlice/NameSlice";
function Start() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  useEffect(() => {
    document.body.classList.add("start-mode");
    return () => document.body.classList.remove("start-mode");
  }, []);

  const goLogin = () => {
    navigate("/log");
  };

  const goSign = () => {
    navigate("/sing");
  };
  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        await saveUserData({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
        dispatch(setUserId(user.uid));
        dispatch(setUserName(user.displayName));
        navigate("/dashboard");
      })
      .catch((error) => alert(error.message));
  };

  const isLargeMobile = useMediaQuery("(min-width:430px)");
  return (
    <Container className="container-start">
      <div className="menu-logo">
        <img src={Logo} alt="Sense Logo" className="logo-img" />
      </div>

      <Box className="start-buttons-wrapper">
        <Stack spacing={2}>
          <BotonStart text="Log In" onClick={goLogin} />
          <BotonStart text="Create your account" onClick={goSign} />
          <BotonStartGoogle
            onClick={handleGoogleSignUp}
            text="Connect with Google"
          />
        </Stack>
      </Box>

      <Box className="text-start">
        <Typography
          sx={{
            color: "#000000",
            fontFamily: "Manrope, sans-serif",
            fontSize: isLargeMobile ? "20px" : "clamp(18px, 2.5vw, 20px)",
            fontWeight: 400,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          A space that supports what you
          <br />
          feel and how you choose.
        </Typography>
      </Box>
    </Container>
  );
}
export default Start;
