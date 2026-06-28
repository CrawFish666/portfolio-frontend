import { Mail, MapPin } from "lucide-react"
import { SocialLink } from "../components/SocialLink"
import { SOCIAL_LIST } from "../constants/socialList"
import { Link } from "react-router-dom"



export function ContactPage() {
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
								<Link className="text-white hover:text-accent-400 transition-colors">hello@example.com</Link>
							</div>
						</div>

						<div className="flex items-center gap-4 p-4 rounded-xl glass">
							<div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
								<MapPin className="w-5 h-5 text-emerald-400"/>
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
								<SocialLink key={item.path} item={item} customSize={28}/>
							))}
						</div>
					</div>
				</div>
				<div className="form feedback">Форма фитбека</div>
			</div>
		</div>
	)
}