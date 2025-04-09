export const guardarUsuario = (usuario) => {
  localStorage.setItem("usuario", JSON.stringify(usuario));
};
export const guardarCorreo = (correo) => {
  localStorage.setItem("correo", JSON.stringify(correo));
};

export const guardarContraseña = (contraseña) => {
  localStorage.setItem("contraseña", JSON.stringify(contraseña));
};

export const obtenerCorreo = () => {
  return JSON.parse(localStorage.getItem("correo"));
};

export const obetenerContraseña = () => {
  return JSON.parse(localStorage.getItem("contraseña"));
};
