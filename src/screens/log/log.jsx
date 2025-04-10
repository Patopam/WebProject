import { obetenerContraseña, obtenerCorreo } from "../../utils";
import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import Inputs from "../../components/Inputs/Inputs";
import { FaRegEyeSlash } from "react-icons/fa";
import "./log.css";
function Log() {
  useEffect(() => {
    setCorreoVerificacion(obtenerCorreo());
    setContraseñaVerificacion(obetenerContraseña());
  }, []);
  const [Correo, setCorreo] = useState("");
  const [Constraseña, setConstraseña] = useState("");
  const [ContraseñaVerificacion, setContraseñaVerificacion] = useState("");
  const [CorreoVerificacion, setCorreoVerificacion] = useState("");

  const navigate = useNavigate();

  const Summit = () => {
    if (
      Correo === ContraseñaVerificacion &&
      Constraseña === CorreoVerificacion
    ) {
      navigate("/dashboard");
      console.log("Usuario correcto");
    } else {
      alert("Usuario o contraseña incorrectos");
      console.log(ContraseñaVerificacion, CorreoVerificacion);
    }
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
              Welcome back
            </Typography>
            <Typography sx={styleText.Centrado}>
              Your emotions, habits and growth right where you left them.{" "}
            </Typography>
          </Box>
          <Box>
            <form>
              <Stack spacing={3}>
                <Inputs
                  value={Correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  label="Usuario"
                  placeholder="Write your email *"
                />
                <Inputs
                  type="password"
                  value={Constraseña}
                  onChange={(e) => setConstraseña(e.target.value)}
                  placeholder={"Write your password *"}
                />
              </Stack>
            </form>
            <Typography sx={styleText.NoCentrado}>Forgot password?</Typography>
          </Box>
          <Box sx={{ width: 460 }}>
            <Stack spacing={3}>
              <BotonStart text="Log In" onClick={Summit} />
              <BotonStartGoogle text="Connect with Google" />
            </Stack>
            <Typography sx={styleText.Centrado}>
              <Link style={styleText.Centrado} to="/sing">
                No account? Create an account
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
export default Log;
