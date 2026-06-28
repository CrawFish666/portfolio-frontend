import { Loader, Loader2, Mail, MapPin } from "lucide-react"
import { SocialLink } from "../components/SocialLink"
import { SOCIAL_LIST } from "../constants/socialList"
import { Link } from "react-router-dom"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export function ContactPage() {

	const feedbackSchema = z.object({
		userName: z.string()
			.trim()
			.min(2, "Минимум 2 символа")
			.max(12, "Максимум 12  символов"),
		email: z.string()
			.min(1, "Email обязателен")
			.email("Неверный формат email"),
		subject: z.string().trim().min(3, "Минимум 4 символа").max(20, "Максимум 20 символов"),
		message: z.string().trim().min(3, "Минимум 4 символа")
	})

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// для отчистки формы после sucсess отправки
		reset
	} = useForm({
		resolver: zodResolver(feedbackSchema),
		// Валидация при первом blur, потом при каждом onChange
		mode: 'onTouched'
	})

	const onSubmitSuccess = async (data) => {
		console.log(data)   // { email: "...", password: "..." }
		// Искуственно добавил время ответа
		await new Promise((resolve) => {
			setTimeout(resolve, 5000);
		});
		reset()
	}

	const onSubmitError = async (error) => {
		console.log(error)
	}



	return (
		<div className="containter max-w-6xl mx-auto px-4 sm:px-6 py-16">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-white mb-4">Контакты</h1>
				<p className="text-dark-400 text-lg max-w-2xl mx-auto">Есть предложение? Напишите мне, и я отвечу в течение 24 часов.</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<div className="space-y-8">

					<div className="glass-card p-6">
						<div className="flex items-center gap-3 mb-3">
							<span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
							<span className="font-medium text-white">Открыт для работы</span>
						</div>
						<p className="text-dark-400 text-sm">
							Сейчас я открыт для новых предложений по работе.
							Среднее время ответа — 24 часа.
						</p>
					</div>

					<div className="space-y-4">
						<div className="flex items-center gap-4 p-4 rounded-xl glass">
							<div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
								<Mail className="w-5 h-5 text-accent-400" />
							</div>
							<div>
								<p className="text-sm text-dark-400">Email</p>
								<a href="mailto:hello@example.com" className="text-white hover:text-accent-400 transition-colors">
									hello@example.com
								</a>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl glass">
							<div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
								<MapPin className="w-5 h-5 text-emerald-400" />
							</div>
							<div>
								<p className="text-sm text-dark-400">Локация</p>
								<p className="text-white">Самара, Россия</p>
							</div>
						</div>

					</div>

					<div>
						<h2 className="text-lg font-medium text-white mb-4">Социальные сети</h2>
						<div className="flex gap-3">
							{SOCIAL_LIST.map(item => (
								<SocialLink key={item.path} item={item} customSize={28} />
							))}
						</div>
					</div>
				</div>

				<div className="form feedback">
					<div className="glass-card p-8">
						<h2 className="text-xl font-semibold text-white mb-6">Отправить сообщение</h2>
						<form onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
							className="space-y-5">
							{/**	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm() */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div className="">
									<label htmlFor="userName"
										className="block text-sm text-dark-400 mb-2">Имя</label>
									<input
										placeholder="Ваше имя"
										{...register("userName")}
										id="userName"
										type="text"
										className="input-field"
									/>
									{errors.userName && <p className="mt-1 text-sm text-red-400">{errors.userName.message}</p>}
								</div>
								<div>
									<label htmlFor="email"
										className="block text-sm text-dark-400 mb-2">Email</label>
									<input placeholder="mail@example.com"
										id="email"
										type="email"
										autoComplete="off"
										{...register("email")}
										className="input-field"
									/>
									{errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
								</div>
							</div>
							<div>
								<label htmlFor="subject"
									className="block text-sm text-dark-400 mb-2">Тема</label>
								<input placeholder="О чём хотите поговорить?"
									id="subject"
									type="text" {...register("subject")}
									className="input-field"
								/>
								{errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>}
							</div>
							<div>
								<label htmlFor="message"
									className="block text-sm text-dark-400 mb-2">Сообщение</label>
								<textarea placeholder="Ваше сообщение..."
									id="message" {...register("message")}
									className="resize-none input-field min-h-[150px]"></textarea>
								{errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
							</div>
							<button disabled={isSubmitting}
								type="submit"
								className={`primary-button w-full py-3.5 ${isSubmitting
									? "cursor-not-allowed opacity-60"
									: "cursor-pointer hover:scale-102"
									}`}>{isSubmitting ? (<Loader className="w-5 h-5 animate-spin [animation-duration:6s]" />) : ("Отправить сообщение")}
							</button>
						</form>
					</div>
				</div>

			</div>
		</div>
	)
}