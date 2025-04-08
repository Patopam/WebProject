import { Button, Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import Logo from "../../assets/logo.png";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
function Start() {
  return (
    <>
      <Container sx={{ width: 500 }}>
        <div className="menu-logo">
          <img src={Logo} alt="Sense Logo" className="menu-logo-img" />
        </div>
        <Box sx={{ width: 460 }}>
          <Stack spacing={2}>
            <BotonStart text="Log In" />
            <BotonStart text="Create your account" />
            <BotonStartGoogle text="Connect with Google" />
          </Stack>
        </Box>
        <Box>
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
