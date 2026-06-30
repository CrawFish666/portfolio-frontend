import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PROJECTS_LIST } from "../constants/projectList"
import { Loader } from "lucide-react";

export function ProjectDetailPage() {
	const { slug } = useParams();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				setLoading(true);

				// const res = await fetch(`/api/projects/${slug}`);
				// const data = await res.json();
				await new Promise((resolve) => {
					setTimeout(resolve, 2500);
				});
				const data = PROJECTS_LIST.filter(project => project.slug === slug)
				console.log(data)
				setProject(data);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [])

	return (
		(loading ? <div className=" min-h-dvh flex items-center justify-center">
			<Loader className="w-20 h-20 animate-spin [animation-duration:6s]">Идёт загрузка данных</Loader>
		</div> : 
		<div>loaded</div>)
	)
}