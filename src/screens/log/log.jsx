import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate } from "react-router";

function Log() {
  return (
    <>
      <Container sx={{ width: 500 }}>
        <Box sx={{ width: 460 }}>
          <Stack spacing={3}>
            <BotonStart text="Log In" />
            <BotonStartGoogle text="Connect with Google" />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
export default Log;
