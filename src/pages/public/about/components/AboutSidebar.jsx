import { getAvailabilityLabel } from "@/utils/availability";

const getYearsText = (years) => {
	if (years % 10 === 1 && years % 100 !== 11) return "год";
	if (years % 10 >= 2 && years % 10 <= 4 && (years % 100 < 10 || years % 100 >= 20)) return "года";
	return "лет";
};


export function AboutSidebar({ settings, isLoading }) {

	return (
		<aside className="lg:col-span-1 glass-card p-6 lg:sticky self-start top-24 items-center">
			<div className="w-26 h-26 mx-auto rounded-full flex items-center justify-center mb-6 overflow-hidden object-cover">
				<img src="/176997-zhivotnoe_chernyj-kot-datskij_dog-koshachih-chernaya_koshka-360x640.jpg" alt="Моя аватарка"></img>
			</div>
			<h2 className="text-xl font-semibold text-primary text-center mb-2">CrawFish666</h2>
			<p className="text-secondary text-center text-sm mb-6">Frontend Developer</p>
			<div className="space-y-3 text-base">
				<div className="flex justify-between gap-5 border-b border-dark-700 py-2">
					<span className="text-muted">Опыт в разработке</span>
					<span className="text-primary">
						{isLoading
							? "—"
							: `${settings?.profile?.experienceYears ?? 0} ${getYearsText(settings?.profile?.experienceYears ?? 0)}`}
					</span>
				</div>
				<div className="flex justify-between gap-5 border-b border-dark-700 py-2">
					<span className="text-muted">Локация</span>
					<span className="text-primary">
						{isLoading
							? "—"
							: `${settings?.profile?.location?.city ?? ""}, ${settings?.profile?.location?.country ?? ""}`}
					</span>
				</div>
				<div className="flex justify-between gap-5 border-b border-dark-700 py-2 text-right">
					<span className="text-muted">Специализация</span>
					<span className="text-primary">Frontend Development</span>
				</div>

				<div className="flex justify-between gap-5 py-2">
					<span className="text-muted">Статус</span>
					<span
						style={{
							color: settings?.availabilityStatus?.color,
						}}
						className="flex items-center gap-2 text-right">
						{isLoading
							? "—"
							: getAvailabilityLabel(settings?.availabilityStatus?.code)}
					</span>
				</div>
			</div>
		</aside>
	)
}