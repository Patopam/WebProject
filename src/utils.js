export const guardarUsuario = (usuario) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

export const guardarContraseña = (contraseña) => {
    localStorage.setItem('contraseña', JSON.stringify(contraseña));
}

export const obtenerUsuario = () => {
    return JSON.parse(localStorage.getItem('usuario'));
}

export const obetnerContraseña = () => {
    return jason.parse(localStorage.getItem('contraseña'));
}