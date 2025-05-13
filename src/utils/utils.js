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

export const filterByTime = (Data, filter) => {
  const today = new Date();
  const result = Data.filter((item) => {
    const itemDate = new Date(item.date?.toDate().toLocaleDateString());
    const diffTime = today - itemDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (filter === "Today") return diffDays < 1;
    if (filter === "Week") return diffDays <= 7;
    if (filter === "Month") return itemDate.getMonth() === today.getMonth();

    return true;
  });
  return result;
};

export const obtenerUsuario = () => {
  return JSON.parse(localStorage.getItem("usuario"));
};
