import { useState } from "react";
import Card from "../../../../components/ui/Card";
import { useFormContext } from "react-hook-form";
import { FileText, Upload, X, Download, Trash2, RotateCcw } from "lucide-react";
import { cn } from "../../../../utils/cn"
import { toast } from "sonner";

export function CVSection({
	selectedCV,
	setSelectedCV,
	removeCV,
	setRemoveCV
}) {

	const { watch, setValue } = useFormContext();

	const cvUrl = watch("cvUrl");

	const hasCV = Boolean(cvUrl);
	const currentFilename = hasCV
		? decodeURIComponent(cvUrl.split("/").pop())
		: null;
	const canDownload = hasCV && !removeCV;
	const canDelete = hasCV && !removeCV;

	const handleSelectFile = (event) => {

		const file = event.target.files?.[0];

		if (!file) return;

		if (file.type !== "application/pdf") {
			toast.error("Можно загрузить только PDF");
			return;
		}

		setSelectedCV(file);
		setRemoveCV(false);

	};

	const handleDelete = () => {
		setSelectedCV(null);
		setRemoveCV(true);
	};

	const handleCancelDelete = () => {
		setRemoveCV(false);
	};

	return (
		<Card title="Управление резюме" className="flex flex-col">
			<div className="space-y-6 flex-1 flex flex-col justify-between">

				{/* Текущее состояние */}

				<div className="rounded-xl border border-dark-700 p-5">

					<div className="flex items-center gap-3">

						<FileText className="text-primary-400" />

						<div>

							<p className="font-medium text-white">

								{currentFilename ??
									"Резюме не загружено"}

							</p>

							<p className="text-sm text-dark-400">

								{removeCV
									? "Резюме будет удалено после сохранения."

									: selectedCV
										? "Новый файл будет загружен после сохранения."

										: hasCV
											? "Текущее резюме."

											: "Загрузите PDF-файл."}

							</p>

						</div>

					</div>

				</div>


				{/* Новый выбранный файл */}

				{selectedCV && (
					<div className="rounded-xl border border-primary-500/40 bg-primary-500/5 p-4">
						<p className="text-sm text-primary-300">
							Новый файл
						</p>
						<p className="mt-1 font-medium text-white">
							{selectedCV.name}
						</p>
					</div>
				)}


				{/* Кнопки */}

				<div className="grid grid-cols-2 gap-3 items-center">
					<label
						className="hover:bg-primary-500 cursor-pointer primary-button">
						<Upload size={18} />
						{hasCV
							? "Заменить"
							: "Загрузить"}
						<input
							type="file"
							accept="application/pdf"
							className="hidden"
							onChange={handleSelectFile}
						/>
					</label>

					<button
						type="button"
						disabled={!hasCV || removeCV}
						className={cn(
							"glass-button",
							!hasCV || removeCV
								? ""
								: ""
						)}
						onClick={() => window.open(`${import.meta.env.VITE_FILE_BASE_URL}${cvUrl}`, "_blank")}
					>
						<Download size={18} />
						Скачать
					</button>

					{removeCV ? (
						<button
							type="button"
							onClick={handleCancelDelete}
							className="
								glass-button
							"
						>
							<RotateCcw size={18} />
							Отменить удаление
						</button>
					) : (
						<button
							type="button"
							onClick={handleDelete}
							disabled={!hasCV}
							className={`
								glass-button
							`}
						>
							<Trash2 size={18} />
							Удалить
						</button>
					)}
				</div>

			</div>
		</Card>
	)
}