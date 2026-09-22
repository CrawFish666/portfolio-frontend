import { Mail, MapPin } from "lucide-react";

export function ContactInfoList({ emailContact, location }) {
	return (
		<div className="space-y-4">
			{emailContact && (
				<div className="flex items-center gap-4 p-4 rounded-xl glass">
					<div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
						<Mail className="w-5 h-5 text-accent-400" />
					</div>

					<div>
						<p className="text-sm text-secondary">Email</p>

						<a
							href={`mailto:${emailContact.url}`}
							className="text-primary hover:text-accent-400 transition-colors"
						>
							{emailContact.url}
						</a>
					</div>
				</div>
			)}

			{location?.city && location?.country && (
				<div className="flex items-center gap-4 p-4 rounded-xl glass">
					<div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
						<MapPin className="w-5 h-5 text-emerald-400" />
					</div>

					<div>
						<p className="text-sm text-secondary">Локация</p>

						<p className="text-primary">
							{location.city}, {location.country}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}