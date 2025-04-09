export const guardarUsuario = (usuario) => {
	localStorage.setItem('usuario', JSON.stringify(usuario));
};
export const guardarCorreo = (correo) => {
	localStorage.setItem('correo', JSON.stringify(correo));
};

export const guardarContraseña = (contraseña) => {
	localStorage.setItem('contraseña', JSON.stringify(contraseña));
};

export const obtenerCorreo = () => {
	return JSON.parse(localStorage.getItem('correo'));
};

export const obetenerContraseña = () => {
	return JSON.parse(localStorage.getItem('contraseña'));
};

export function filterByTime(dateStr, selectedFilter) {
	const today = new Date();
	const itemDate = new Date(dateStr);

	if (selectedFilter === 'Today') {
		return (
			itemDate.getDate() === today.getDate() &&
			itemDate.getMonth() === today.getMonth() &&
			itemDate.getFullYear() === today.getFullYear()
		);
	}

	if (selectedFilter === 'Week') {
		const diff = Math.abs(today - itemDate);
		const daysDiff = diff / (1000 * 60 * 60 * 24);
		return daysDiff <= 7;
	}

	if (selectedFilter === 'Month') {
		return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear();
	}

	return true;
}
