import { Link, useParams } from "react-router-dom";
import {
	ArrowLeft,
	Calendar,
	Loader,
	Code2,
} from "lucide-react";
import { TechTags } from "../../../components/ui/TechTags";
import { ROUTES } from "../../../routes/pathsConstants";
import { useProjectBySlug } from "../../../hooks/queries/useProjects";


export function ProjectDetailPage() {
	const { slug } = useParams();

	const {
		data: project,
		isLoading,
		isError,
	} = useProjectBySlug(slug);

	if (isLoading) {
		return (
			<div className="min-h-dvh flex items-center justify-center">
				<Loader className="w-20 h-20 animate-spin [animation-duration:6s]" />
			</div>
		);
	}

	if (isError || !project) {
		return (
			<div className="min-h-dvh flex flex-col items-center justify-center gap-4">
				<h1 className="text-3xl font-bold">
					Проект не найден
				</h1>

				<Link to={ROUTES.PROJECTS} className="primary-button">
					К проектам
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 min-h-[100dvh]">
			<Link to={ROUTES.PROJECTS} className="inline-flex items-center 
				gap-2 text-white hover:text-zinc-500 mb-8" >
				<ArrowLeft className="h-4 w-4" />
				Назад к проектам
			</Link>

			<h1 className="text-3xl sm:text-4xl font-bold text-white">{project.title}</h1>
			<p className="mb-8 text-dark-300 text-lg max-w-3xl">{project.short_description}</p>

			<div className="overflow-hidden h-64 md:h-96 rounded-2xl mb-8">
				<img src={project.image_url || "/placeholder.webp"} alt={project.title} className="w-full h-full object-cover" />
			</div>

			<div className="flex gap-4 mb-8">
				{project.liveDemo_url &&
					<a href={project.liveDemo_url} target="_blank" rel="noopener noreferrer" className="primary-button cursor-pointer">Демо онлайн</a>}
				{project.source_url &&
					<a href={project.source_url}
						className="glass-button" target="_blank" rel="noopener noreferrer">
						Исходный код
					</a>
				}
			</div>

			<div className="grid grid-cols-4 gap-4 mb-8">
				<div className="glass-card p-4 flex flex-col justify-center items-center gap-1">
					<Calendar className="text-orange-400" />
					<p className="font-bold text-lg">{new Date(project.createdAt).toLocaleDateString('ru-RU')}</p>
					<p className="text-dark-400 text-sm">Создан</p>
				</div>
				<div className="glass-card p-4 flex flex-col justify-center items-center gap-1">
					<Code2 className="text-yellow-300" />
					<p className="font-bold text-lg">{project.tech?.length ?? 0}</p>
					<p className="text-dark-400 text-sm">Технологий</p>
				</div>
			</div>

			<div className="glass-card p-6 mb-8">
				<h3 className="text-2xl font-bold mb-4">О проекте</h3>
				<p>{project.full_description}</p>
			</div>

			<div className="glass-card p-6">
				<h3 className="text-2xl font-bold mb-4">Стек технологий</h3>
				<TechTags tech={project.tech ?? []} />
			</div>
		</div>
	)
}
