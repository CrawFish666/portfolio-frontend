import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../utils/authValidationScheme";
import { ROUTES } from '../../routes/pathsConstants';


export function SignInPage() {
	const { user, accessToken, loading, signIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const singInSchema = loginSchema.extend({
		rememberMe: z.boolean(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// для отчистки формы после sucсess отправки
		reset,
		// Для отрисовки ошибок после запроса в бекенд
		setError
	} = useForm({
		resolver: zodResolver(loginSchema),
		// Валидация при первом blur, потом при каждом onChange
		mode: 'onTouched'
	})

	const onSubmitSuccess = async (data) => {
		try {
			await signIn(data.email, data.password);
			reset();
			navigate(location.state?.from || ROUTES.HOME, {
				replace: true,
			});
		} catch (error) {
			console.log(error)
			// Добавить вывод ошибок в toast/уведы просто сверху
			setError("root", { message: error.message });
		}
	}

	const onSubmitError = async (error) => {
		console.log(error)
	}

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/")
		}
	}

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-6">
				<h1 className="text-3xl text-primary font-bold mb-2">С возвращением!</h1>
				<p className="text-secondary">Залогиньтесь, чтобы продолжить</p>
			</div>
			<button className="text-sm text-secondary mb-2 flex gap-1 items-center cursor-pointer" onClick={handleBack}>
				<ArrowLeft className="h-4 w-4" />
				Назад
			</button>
			<form noValidate className="flex flex-col w-full rounded-2xl overflow-hidden bg-surface backdrop-blur-xl border border-subtle p-8" onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}>
				{errors.root?.message && <div className="text-red-400 text-sm mb-3">{errors.root.message}</div>}
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="email">Email</label>
					<input autoComplete="off" {...register('email')} className="input-field text-primary" id="email" type="email" placeholder="example@example.com" />
					{errors.email?.message && <p>{errors.email.message}</p>}
				</div>
				<div className="mb-5">
					<label className="block text-sm font-medium text-thirdly mb-2" htmlFor="password">Password</label>
					<input autoComplete="current-password" {...register('password')} className="input-field text-primary" id="password" type="password" placeholder="Enter your password" />
				</div>
				<div className="flex justify-between gap-4 mb-5">
					<label className="flex items-center gap-2" htmlFor="checkbox">
						<input {...register('rememberMe')} id="checkbox" type="checkbox"
							className="w-4 h-4"
						/>
						<span className="text-sm text-secondary">Запомнить меня</span>
					</label>
					<Link className="text-blue-400" to={ROUTES.FORGOT_PASSWORD}>Забыли пароль?</Link>
				</div>
				<button className="primary-button mb-5" type="submit">Вход</button>
				<div className="text-center">
					<span>Еще нет аккаунта? </span>
					<Link className="text-blue-400" to={ROUTES.SIGN_UP}>Регистрация</Link>
				</div>
			</form>
		</div>
	)
}