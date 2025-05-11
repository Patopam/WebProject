import { Typography, Container, Stack, Box } from "@mui/material";
import BotonStart from "../../components/Buttons/botonesStart";
import BotonStartGoogle from "../../components/Buttons/botonStartGoogle";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import Inputs from "../../components/Inputs/Inputs";
import { FaRegEyeSlash } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addUser } from "../../services/firebaseUtils";
import { auth } from "../../services/firebase";

import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import "./sign.css";

function Sign() {
  const [Usuario, setUsuario] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Constraseña, setConstraseña] = useState("");

  const Navigate = useNavigate();

  /* const Google = () => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };*/

  const Summit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, Correo, Constraseña)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(user);
        addUser({
          uidUser: user.uid,
          name: Usuario,
          Email: Correo,
        });

        Navigate("/log");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert(error.message);
      });
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
      <Container className="Container-sign" sx={{ width: 500 }}>
        <Box>
          <Typography variant="h2" sx={styleText.Titulo}>
            Register
          </Typography>
          <Typography sx={styleText.Centrado}>
            Join Sense and take control of your emotional and financial habit.
          </Typography>
        </Box>
        <Box>
          <form onSubmit={Summit}>
            <Stack spacing={3}>
              <Inputs
                value={Usuario}
                onChange={(e) => setUsuario(e.target.value)}
                label="Usuario"
                placeholder="Write your name *"
              />
              <Inputs
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
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

              <Box sx={{ width: 460 }}>
                <Stack spacing={3}>
                  <BotonStart text="Create your account" />
                  <BotonStartGoogle text="Connect with Google" />
                </Stack>
                <Typography sx={styleText.Centrado}>
                  <Link to="/log">Do you have an account? Log in</Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}
export default Sign;
