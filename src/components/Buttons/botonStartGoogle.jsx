import { Button, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { styled } from "@mui/material/styles";
const StyleBotton = styled(Button)(() => ({
  height: "56px",
  borderRadius: "16px",
  backgroundColor: "#E8E8E8",
  textTransform: "none",
  paddingLeft: "16px", // Margen izquierdo constante
  paddingRight: "24px", // Margen derecho constante sin importar el texto
  boxShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8, // Espacio constante entre ícono y texto
  "&:hover": {
    backgroundColor: "#A4A4A4",
    boxShadow: "none",
  },
  "& .MuiButton-startIcon": {
    margin: 0, // Eliminamos margen lateral del ícono
    color: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function BotonStartGoogle({ onClick, text }) {
  return (
    <StyleBotton variant="contained" onClick={onClick} startIcon={<FcGoogle />}>
      <Typography
        sx={{
          color: "var(--Neutral-1000, #333)",
          fontFamily: "Manrope, sans-serif",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          color: "#000000",
        }}
      >
        {text}
      </Typography>
    </StyleBotton>
  );
}
