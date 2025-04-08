import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import Logo from "../../assets/Sense Logo start.png";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate } from "react-router";
import "./start.css";
function Start() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/log");
  };
  return (
    <>
      <Container sx={{ width: 500 }} className="container-start">
        <div className="menu-logo">
          <img src={Logo} alt="Sense Logo" className="menu-logo-img" />
        </div>
        <Box sx={{ width: 460 }}>
          <Stack spacing={3}>
            <BotonStart text="Log In" onClick={handleClick} />
            <BotonStart text="Create your account" />
            <BotonStartGoogle text="Connect with Google" />
          </Stack>
        </Box>
        <Box className="text-start">
          <Typography
            sx={{
              color: "var(--Neutral-1000, #333)",
              fontFamily: "Manrope, sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              color: "#000000",
              textAlign: "center",
            }}
          >
            A space that supports what you feel and how you choose.
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Start;
