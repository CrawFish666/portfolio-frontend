import { SkeletonCircle } from "../ui/skeleton/SkeletonCircle";
import { SkeletonLine } from "../ui/skeleton/SkeletonLine";


export function HeaderUserSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<SkeletonCircle size={32} />
			<div className="hidden sm:block">
				<SkeletonLine width={80} height={12} />
			</div>
		</div>
	);
}