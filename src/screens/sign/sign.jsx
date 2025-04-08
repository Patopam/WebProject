import { guardarUsuario } from "../../utils";
import { guardarContraseña } from "../../utils";
import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import Inputs from "../../components/Inputs/Inputs";
import { FaRegEyeSlash } from "react-icons/fa";

function Sign() {
  const [Usuario, setUsuario] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Constraseña, setConstraseña] = useState("");

  const Summit = () => {
    guardarUsuario(Usuario);
    guardarContraseña(Constraseña);
  };
  const styleText = {
    Centrado: {
      color: "var(--Neutral-1000, #333)",
      fontFamily: "Manrope, sans-serif",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      color: "#000000",
      marginTop: "20px",
      textAlign: "center",
    },
    NoCentrado: {
      color: "var(--Neutral-1000, #333)",
      fontFamily: "Manrope, sans-serif",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      color: "#000000",
      marginTop: "20px",
    },
    Titulo: {
      color: "var(--Neutral-1000, #333)",
      fontFamily: "Manrope, sans-serif",
      fontWeight: 400,
      color: "#000000",
      marginTop: "20px",
      textAlign: "center",
    },
  };
  return (
    <>
      <Container className="Container-log" sx={{ width: 500 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h2" sx={styleText.Titulo}>
              Register
            </Typography>
            <Typography sx={styleText.Centrado}>
              Join Sense and take control of your emotional and financial habit.
            </Typography>
          </Box>
          <Box>
            <form>
              <Stack spacing={3}>
                <Inputs
                  value={Usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  label="Usuario"
                  placeholder="Write your name *"
                />
                <Inputs
                  value={Usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  label="Usuario"
                  placeholder="Write your email *"
                />
                <Inputs
                  type="password"
                  icon={<FaRegEyeSlash />}
                  value={Constraseña}
                  onChange={(e) => setConstraseña(e.target.value)}
                  placeholder={"Write your password *"}
                />
              </Stack>
            </form>
          </Box>
          <Box sx={{ width: 460 }}>
            <Stack spacing={3}>
              <BotonStart text="Log In" onClick={Summit} />
              <BotonStartGoogle text="Connect with Google" />
            </Stack>
            <Typography sx={styleText.Centrado}>
              <Link to="/login">Do you have an account? Log in</Link>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
export default Sign;
