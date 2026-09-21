import { HomeCTASection } from "./components/HomeCTASection";
import { HomeFeaturedProjectsSection } from "./components/HomeFeaturedProjectsSection";
import { HomeTechSection } from "./components/HomeTechSection";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { useProjects } from "../../../hooks/queries/useProjects";
import { useSettings } from "../../../hooks/queries/useSettings";

export function HomePage() {

	const {
		data: projects = [],
		isLoading: projectsLoading,
		isError: projectsError,
	} = useProjects({ favorite: true });

	const {
		data: settings = null,
		isLoading: settingsLoading,
		isError: settingsError,
	} = useSettings();


	return (
		<>
			{/** hero section */}
			<HomeHeroSection settings={settings}
				loading={settingsLoading}
				error={settingsError} />

			{/** tech section */}
			<HomeTechSection />

			{/* Projects */}
			<HomeFeaturedProjectsSection projects={projects}
				loading={projectsLoading}
				error={projectsError} />

			{/* Call To action */}
			<HomeCTASection />
		</>

	)
}