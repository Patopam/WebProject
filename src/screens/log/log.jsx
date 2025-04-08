import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate } from "react-router";

import { Password } from "primereact/password";

import { InputText } from "primereact/inputtext";

function Log() {
  return (
    <>
      <Container sx={{ width: 500 }}>
        <Box>
          <form>
            <InputText
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Password
              value={value}
              onChange={(e) => setValue(e.target.value)}
              feedback={false}
              tabIndex={1}
            />
          </form>
        </Box>
        <Box sx={{ width: 460 }}>
          <Stack spacing={3}>
            <BotonStart text="Log In" />
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
