import { HeaderNav } from "./HeaderNav";
import { HeaderUser } from "./HeaderUser";

export function MobileMenu({ open, onClose }) {
	if (!open) return null;

	return (
		<div
			className="md:hidden fixed top-16 left-0 right-0	bottom-0	glass	border-b border-subtle z-60 p-4">
			<HeaderNav mobile onNavigate={onClose} />

			<div className="border-t border-subtle mt-4 pt-4">
				<HeaderUser mobile onNavigate={onClose} />
			</div>
		</div>
	);
}