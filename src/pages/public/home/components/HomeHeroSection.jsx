import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { SocialLink } from "../../../../components/SocialLink";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes/pathsConstants";
import { withAlpha } from "../../../../utils/colorAlpha";
import { getAvailabilityLabel } from "../../../../utils/availability";


export function HomeHeroSection({
	settings, loading
}) {

	const cvUrl = settings?.cvUrl
		? `${import.meta.env.VITE_FILE_BASE_URL}${settings.cvUrl}`
		: null;

	return (
		<section className="flex items-center min-h-dvh py-10">

			<div className="max-w-6xl mx-auto px-4 sm:px-6">
				<div className="max-w-3xl ">
					{loading ? <div className="h-9.5 w-40 bg-dark-800/50 animate-pulse-slow rounded-full mb-8"></div>
						:
						<div
							style={{
								color: settings?.availabilityStatus?.color || "#10b981",
								backgroundColor: withAlpha(settings?.availabilityStatus?.color, "1a"),
								borderColor: withAlpha(settings?.availabilityStatus?.color, "66"),
							}}
							className="animate-glow inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-sm mb-8 ">
							<Sparkles className="w-4 h-4" />
							{getAvailabilityLabel(settings?.availabilityStatus?.code)}
						</div>
					}
					<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
						<span className="text-primary">Привет, я </span>
						<span className="gradient-text">React FrontEnd Developer</span>
					</h1>
					<p className="text-xl text-secondary mb-4 leading-8">Создаю современной веб-приложения с чистым кодом и отличным UX. Специализируюсь на React, TypeScript, Node.js и PostgreSQL.</p>
					<div className="flex items-center gap-1.5 text-secondary mb-8">
						<MapPin className="w-5 h-5" />
						Самара, Россия (удалённо)
					</div>
					<div className="flex flex-wrap flex-col sm:flex-row gap-6 items-stretch sm:items-center mb-10">
						<Link className="primary-button text-base px-6 py-3" to={ROUTES.PROJECTS}>
							Смотреть проекты
							<ArrowRight className="w-5 h-5" />
						</Link>
						{loading ?
							<div className="glass-button text-base px-6 py-3 w-40 self-stretch  animate-pulse-slow"></div> :
							cvUrl && (
								<a
									href={cvUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="glass-button text-base px-6 py-3"
								>
									<Download className="w-5 h-5" />
									Скачать CV
								</a>
							)
						}
					</div>
					{loading ?
						<div className="bg-dark-800/50 animate-pulse h-10.5 w-50 rounded-full"></div> :
						<div className="flex gap-5">
							{settings?.contacts?.map(contact => (
								<SocialLink key={contact._id} item={contact} />
							))}

						</div>
					}
				</div>
			</div>
		</section>
	)
}