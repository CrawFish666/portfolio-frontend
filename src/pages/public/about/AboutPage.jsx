import { useMemo } from "react";
import { AboutCareerGoal } from './components/AboutCareerGoal';
import { AboutTechStack } from './components/AboutTechStack';
import { AboutWorkPrinciples } from './components/AboutWorkPrinciples';
import { AboutSidebar } from './components/AboutSidebar';
import { AboutBio } from './components/AboutBio';
import { useTechnologies } from "../../../hooks/queries/useTechnologies";
import { useSettings } from "../../../hooks/queries/useSettings";


export function AboutPage() {

	const {
		data: settings = null,
		isLoading: settingsLoading,
		isError: settingsError,
	} = useSettings();

	const {
		data: technologies = [],
		isLoading: technologiesLoading,
		isError: technologiesError,
	} = useTechnologies();

	const technologiesGroupedByCategory = useMemo(() => {
		const groupedMap = new Map();

		technologies.forEach((technology) => {
			const category = technology.category;

			if (!category?._id) {
				return;
			}

			if (!groupedMap.has(category._id)) {
				groupedMap.set(category._id, {
					...category,
					technologies: [],
				});
			}

			groupedMap
				.get(category._id)
				.technologies
				.push(technology);
		});

		return [...groupedMap.values()];
	}, [technologies]);


	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 py-12">
			{/* Header */}
			<div className="text-center">
				<h1 className="text-4xl font-bold text-primary mb-4">Обо мне</h1>
				<p className="text-secondary text-lg">Немного о том, кто я и чем занимаюсь</p>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/** left/photo section */}
				<AboutSidebar settings={settings} isLoading={settingsLoading} />
				<div className="lg:col-span-2 space-y-12">
					{/** bio/right sections */}
					<AboutBio />
					{/** Принципы моей работы */}
					<AboutWorkPrinciples />
					{/** Tech Skills */}
					<AboutTechStack technologies={technologiesGroupedByCategory} />
					{/** What I'm Looking For */}
					<AboutCareerGoal />
				</div>
			</div>
		</div>
	)
}