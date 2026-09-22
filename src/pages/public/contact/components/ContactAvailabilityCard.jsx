import { getAvailabilityLabel } from "@/utils/availability";


export function ContactAvailabilityCard({ isLoading, settings }) {
	return (
		<div className="glass-card p-6">
			<div className="flex items-center gap-3 mb-3">
				{isLoading
					? <div className="h-6 w-full rounded-full animate-pulse bg-dark-800"></div>
					: <>
						<span style={{
							backgroundColor: settings?.availabilityStatus?.color,
						}}
							className="w-3 h-3 rounded-full animate-pulse" />

						<span className="font-medium text-primary">
							{getAvailabilityLabel(settings?.availabilityStatus?.code)}
						</span>
					</>}
			</div>

			<p className="text-secondary text-sm">
				Среднее время ответа — 24 часа.
			</p>
		</div>
	);
}