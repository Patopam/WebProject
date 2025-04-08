import { guardarUsuario } from "../../utils";
import { guardarContraseña } from "../../utils";
import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Inputs from "../../components/Inputs/Inputs";
import { FaRegEyeSlash } from "react-icons/fa";
function Log() {
  const [Usuario, setUsuario] = useState("");
  const [Constraseña, setConstraseña] = useState("");

  const Summit = () => {
    guardarUsuario(Usuario);
    guardarContraseña(Constraseña);
  };

  return (
    <>
      <Container sx={{ width: 500 }}>
        <Box>
          <form>
            <Stack spacing={3}>
              <Inputs
                value={Usuario}
                onChange={(e) => setUsuario(e.target.value)}
                label="Usuario"
                placeholder="Usuario"
              />
              <Inputs
                type="password"
                icon={<FaRegEyeSlash />}
                value={Constraseña}
                onChange={(e) => setConstraseña(e.target.value)}
                placeholder={"Constraseña"}
              />
            </Stack>
          </form>
        </Box>
        <Box sx={{ width: 460 }}>
          <Stack spacing={3}>
            <BotonStart text="Log In" onClick={Summit} />
            <BotonStartGoogle text="Connect with Google" />
          </Stack>
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
              marginTop: "20px",
            }}
          >
            No account? Create an account
          </Typography>
        </Box>
      </Container>
    </>
  );
}
export default Log;
