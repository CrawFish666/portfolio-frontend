import { Award, Calendar, Languages, MapPin, Building, Briefcase } from "lucide-react"
import { US, RU } from 'country-flag-icons/react/3x2'


const educations = [
	{
		where: 'Самарский государственный технический университет',
		degree: 'Приборостроение',
		period: '2016-2020'
	},
	{
		where: 'Udemy',
		degree: 'JavaScript • TypeScript • React • Redux Toolkit • HTML • CSS',
		period: '2020-2026'
	},

]

const experiences = [
	{
		id: 1,
		position: 'Программист внедрения',
		corp: 'ООО «Альфа и Омега» (Первый БИТ)',
		location: 'Самара, Россия',
		description: 'Внедрение и сопровождение решений 1С, анализ бизнес-процессов, настройка конфигураций, обучение пользователей.',
		skills: ['1C', '1C бухгалтерия', '1C ЗУП', 'И еще....'],
		achievements: ['Сертификат', 'Обучал 20 групп сразу'],
		start_date: '2022-06',
		end_date: null,
		is_current: true
	},
	{
		id: 2,
		position: 'Преподаватель',
		corp: 'ооо обучалка',
		location: 'Самара, Россия',
		description: 'Обучал детей',
		skills: ['react', 'node.js'],
		achievements: ['Обучил 50 детей', 'Обучал 20 групп сразу'],
		start_date: '2016-02',
		end_date: '2017-02',
		is_current: false
	},
	{
		id: 3,
		position: 'Техник/Программист',
		corp: 'Фриланс',
		location: 'Самара, Россия',
		description: 'Майнил бетховены',
		skills: ['react', 'node.js'],
		achievements: ['Обучил 50 детей', 'Обучал 20 групп сразу'],
		start_date: '2012-02',
		end_date: '2015-02',
		is_current: false
	}

]

const educated_languages = [
	{
		id: 1,
		language: 'English',
		educated_class: 'B1',
		icon: US
	},
	{
		id: 2,
		language: 'Russian',
		educated_class: 'Носитель',
		icon: RU
	},

]


export function ExperiencePage() {

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-white mb-4">Опыт работы</h1>
				<p className="text-dark-400 text-lg">Мой профессиональный путь</p>
			</div>
			{/**Experience Timeline */}
			<section className="relative">
				<div className="absolute left-[11px] md:left-[15px] top-7 md:top-9 bottom-0 w-0.5 bg-dark-700" />

				<div className="space-y-8">
					{experiences.map((exp) => (
						<ExperienceTrackerCard
							key={exp.id}
							experience={exp}
						/>
					))}
				</div>
			</section>

			{/**Education */}
			<section>
				<h2 className="flex items-center gap-3 text-2xl font-semibold text-white mb-8">
					<Award className="text-accent-400 w-6 h-6" />
					Образование
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{educations.map((item, i) => (
						<div key={i} className="glass-card p-6">
							<h3 className="text-white font-semibold mb-2">{item.where}</h3>
							<p className="text-dark-400 text-sm mb-3">{item.degree}</p>
							<div className="flex items-center gap-2 text-sm text-dark-500">
								<Calendar className="w-4 h-4" />
								{item.period}
							</div>
						</div>
					))}
				</div>
			</section>

			{/**Секция владения языками */}
			<section>
				<h2 className="flex items-center gap-3 text-2xl font-semibold text-white mb-8">
					<Languages className="text-accent-400 w-6 h-6" />
					Владение языками
				</h2>
				<div className="flex gap-6 flex-wrap">
					{educated_languages.map(language => (
						<div key={language.id} className="glass-card p-5 flex-1 basis-60 md:basis-80 sm:flex-none sm:basis-60">
							<h3 className="flex gap-2 items-center text-white font-semibold">
								<language.icon className="w-4 h-4" />
								{language.language}
							</h3>
							<p className="text-base text-dark-500">Уровень владения: {language.educated_class}</p>
						</div>
					))}
				</div>
			</section>

			{/**Ключевые навыки мб убрать */}
			<section>

			</section>

		</div>
	)
}

function ExperienceTrackerCard({ experience, isLast }) {
	const formatDate = (date) => {
		if (!date) return 'Настоящее время';
		const [year, month] = date.split("-");
		const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
		return `${monthNames[parseInt(month) - 1]} ${year}`
	}

	return (
		<div className="relative pl-8 md:pl-12">

			{/* Dot */}
			<div className={`absolute left-0 top-1 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${experience.is_current
				? 'bg-emerald-500/20 border-emerald-500'
				: 'bg-dark-800 border-dark-600'
				} flex items-center justify-center`}>
				<Briefcase className={`w-3 h-3 md:w-4 md:h-4 ${experience.is_current ? 'text-emerald-400' : 'text-dark-500'}`} />
			</div>

			{/* Card */}
			<div className="glass-card p-6 ml-2 hover:border-white/20 transition-all">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
					<div>
						<h3 className="text-lg font-semibold text-white">{experience.position}</h3>
						<div className="flex flex-wrap items-center gap-3 text-sm text-dark-400 mt-1">
							<span className="flex items-center gap-1.5">
								<Building className="w-4 h-4" />
								{experience.corp}
							</span>
							<span className="flex items-center gap-1.5">
								<MapPin className="w-4 h-4" />
								{experience.location}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800/50 text-sm">
						<Calendar className="w-4 h-4 text-accent-400" />
						<span className="text-dark-300">
							{formatDate(experience.start_date)} — {formatDate(experience.end_date)}
						</span>
						{experience.is_current && (
							<span className="text-emerald-400">• Сейчас</span>
						)}
					</div>
				</div>

				{/* Description */}
				<p className="text-dark-400 text-sm mb-4">{experience.description}</p>

				{/* Technologies */}
				<div className="flex flex-wrap gap-2 mb-4">
					{experience.skills.map((tech, i) => (
						<span key={i} className="tag tag-blue text-xs">
							{tech}
						</span>
					))}
				</div>

				{/* Achievements */}
				<div className="border-t border-dark-700 pt-4">
					<h4 className="text-sm font-medium text-dark-300 mb-3">Достижения:</h4>
					<ul className="space-y-2">
						{experience.achievements.map((achievement, i) => (
							<li key={i} className="flex items-start gap-2 text-sm text-dark-400">
								<span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 flex-shrink-0" />
								{achievement}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)

}