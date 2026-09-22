import { Skeleton } from "./Skeleton";

export function SkeletonCircle({ size = 32 }) {
	return (
		<Skeleton
			className="rounded-full"
			style={{ width: size, height: size }}
		/>
	);
}