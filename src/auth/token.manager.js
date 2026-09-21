let accessToken = null;

export const tokenManager ={
	// Получить текущий токен
	getToken: () => accessToken,

	// Установить токен
	setToken: (token) => {
		accessToken = token;
	},

	//Удалить токен
	clearToken: () => {
		accessToken = null;
	}
}