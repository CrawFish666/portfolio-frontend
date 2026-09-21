import { useContext, useEffect, useState, useCallback } from "react";
import { tokenManager } from "../auth/token.manager";
import { authApi } from "../api/auth.api";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import { authEvents } from "../auth/auth.events";


export function AuthProvider({ children }) {

	const [user, setUser] = useState(null); // {id, name, etc}
	// Висит при проверки сессии loading true и в App.jsx скрывает сплеш скрином
	const [loading, setLoading] = useState(true);
	const decodeUserFromToken = useCallback((token) => {

		try {
			const decoded = jwtDecode(token);
			return {
				_id: decoded.sub,
				username: decoded.username,
				avatar: decoded.avatar,
				role: decoded.role,
				isVerified: decoded.isVerified,
			};
		} catch (error) {
			console.error(
				"Ошибка декодирования JWT",
				error
			);
			return null;
		}
	}, []);

	const setUserFromToken = useCallback((token) => {
		if (!token) {
			setUser(null);
			return;
		}
		const userData = decodeUserFromToken(token);
		setUser(userData);
	},
		[decodeUserFromToken]
	);

	const signIn = useCallback(
		async (email, password) => {
			const data = await authApi.signIn(email, password);
			const token = data.accessToken;
			// Сохраняем access token
			tokenManager.setToken(token);
			// Кладем пользователя в React state
			setUserFromToken(token);
			return data;
		},
		[setUserFromToken]
	)

	const signUp = useCallback(async (data) => {
		const response = await authApi.signUp(data);

		if (response?.accessToken) {
			tokenManager.setToken(response.accessToken);
			setUserFromToken(response.accessToken);
		}
		return response;
	}, [setUserFromToken]
	)

	const signOut = useCallback(async () => {
		tokenManager.clearToken();
		setUser(null);
		try {
			await authApi.signOut();
		} catch (error) {
			console.error("Logout error", error);
		}
	},
		[]
	);

	// Восстановление сессии при F5/Заходе на сайте
	useEffect(() => {
		const initAuth = async () => {
			try {
				const data = await authApi.refresh();
				tokenManager.setToken(data.accessToken);
				setUserFromToken(data.accessToken);
			} catch (error) {
				// Нет активной сессии
				tokenManager.clearToken();
				setUser(null);
			} finally {
				setLoading(false);
			}
		}
		initAuth();
	}, [setUserFromToken])

	useEffect(() => {
		const unsubscribe = authEvents.subscribe(
			(event, token) => {
				if (event === "TOKEN_UPDATED") {
					setUserFromToken(token);
				}
				if (event === "LOGOUT") {
					setUser(null);
				}
			}
		);
		return unsubscribe;

	}, [setUserFromToken]);

	const forgotPassword = useCallback(async (email) => {
		return authApi.forgotPassword(email);
	}, []);

	const verifyResetPwdToken = useCallback(async (token) => {
		return authApi.verifyResetPasswordToken(token);
	}, []);

	const resetPasswordViaToken = useCallback(
		async (token, password) => {
			return authApi.resetPassword(token, password);
		},
		[]
	);

	const value = {
		user,
		loading,
		signIn,
		signUp,
		signOut,
		forgotPassword,
		verifyResetPwdToken,
		resetPasswordViaToken
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}
