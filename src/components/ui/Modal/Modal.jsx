import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const sizeClasses = {
	sm: "max-w-md",
	md: "max-w-2xl",
	lg: "max-w-4xl",
	xl: "max-w-6xl",
};

export default function Modal({ isOpen, onClose, title, size = "md", children }) {

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		}

		// Начинаем слушать keydown и проверят нажатую клавишу. Если Escape, то делаем onClose(закрываем модалку)
		document.addEventListener("keydown", handleKeyDown);
		// Запрет на прокрут страницы когда открыли модалку
		document.body.style.overflow = "hidden";

		// При размонтировании удаляем слушательно и разрешаем скролл
		return () => {
			document.removeEventListener(
				"keydown",
				handleKeyDown
			);
			document.body.style.overflow = "";
		};

	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div onClick={e => e.stopPropagation()} className={`modal-content max-h-[90vh] overflow-y-auto ${sizeClasses[size]} `}>
				{title && (
					<div className="flex items-center justify-between border-white/15">
						<h2 className="text-xl font-semibold text-white">
							{title}
						</h2>
						<button className="p-2 rounded-lg hover:bg-white/10 text-dark-400 cursor-pointer" type="button" onClick={onClose}>
							<X className="w-5 h-5" />
						</button>
					</div>
				)}
				<div>
					{children}
				</div>
			</div>
		</div>,
		document.getElementById("modal-root")
	)
}