import { Button, Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/BotonesLogin";
import GoogleIcon from "@mui/icons-material/Google";
function Start() {
  return (
    <>
      <Container sx={{ width: 500 }}>
        <Box sx={{ width: 460 }}>
          <Stack spacing={2}>
            <BotonStart text="Iniciar sesión" />
            <BotonStart text="Crear cuenta" color={"#9C9CD2"} />
            <BotonStart
              text="   Inicurse con Google"
              Icono={
                <GoogleIcon sx={{ fontSize: "24px", color: "#fffffff" }} />
              }
            />
          </Stack>
        </Box>
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
          <p>A space that supports what you feel and how you choose.</p>
        </Typography>
      </Container>
    </>
  );
}

export default Start;
