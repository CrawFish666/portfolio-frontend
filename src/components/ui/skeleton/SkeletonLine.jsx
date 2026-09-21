import { Skeleton } from "./Skeleton";

export function SkeletonLine({ width = 80, height = 12 }) {
	return (
		<Skeleton
			className="rounded"
			style={{ width, height }}
		/>
	);
}