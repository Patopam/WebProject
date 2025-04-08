import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const StyleBotton = styled(Button)(() => ({
  height: "56px",
  borderRadius: "16px",
  backgroundColor: "#49499D",
  color: "#FFFFFF",
  textTransform: "none",
  paddingLeft: "16px", // Margen izquierdo constante
  paddingRight: "24px", // Margen derecho constante sin importar el texto
  boxShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8, // Espacio constante entre ícono y texto
  "&:hover": {
    backgroundColor: "#8A8AC0",
    boxShadow: "none",
  },
  "& .Icono": {
    margin: 0, // Eliminamos margen lateral del ícono
    backgroundColor: "#9C9CD2",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  fontSize: "18px",
  fontWeight: 500,
  fontFamily: "'Manrope', sans-serif",
}));

export default function BotonStart({ onClick, text, Icono }) {
  return (
    <StyleBotton variant="contained" onClick={onClick}>
      <Typography
        sx={{
          color: "var(--Neutral-1000, #333)",
          fontFamily: "Manrope, sans-serif",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
          color: "#FFFFFF",
        }}
      >
        {Icono}
        {text}
      </Typography>
    </StyleBotton>
  );
}
