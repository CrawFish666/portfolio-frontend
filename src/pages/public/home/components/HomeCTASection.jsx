import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes/pathsConstants";

export function HomeCTASection() {
	return (
		<section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-25">
			<div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
				<div className="flex flex-col gap-3 items-center">
					<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Готов сотрудничать?</h2>
					<p className="text-secondary mb-8 max-w-lg">
						Я всегда открыт для новых проектов и интересных предложений.
						Давайте обсудим вашу идею!
					</p>

					<Link to={ROUTES.CONTACT} className="flex flex-wrap primary-button text-base px-4 sm:px-8 py-2 sm:py-3 items-center">
						Связаться со мной
						<ArrowRight className="w-5 h-5"/>
					</Link>
				</div>
			</div>
		</section>
	)
}