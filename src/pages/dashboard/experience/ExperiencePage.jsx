import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Save, Briefcase, GraduationCap, Languages } from "lucide-react";
import { Controller } from "react-hook-form";
import { TechnologySelect } from "../../../components/ui/MultiSelect/TechnologySelect";
import { useState } from "react";
import { useAdminContent } from "../../../hooks/queries/useAdminContent";
import { useAdminContentMutations } from "../../../hooks/mutations/useAdminContentMutations";
import { useTechnologies } from "../../../hooks/queries/useTechnologies";

const TABS = [
	{ value: "experience", label: "Опыт", icon: Briefcase },
	{ value: "education", label: "Образование", icon: GraduationCap },
	{ value: "languages", label: "Языки", icon: Languages },
];

export function ExperiencePage() {
	const [tab, setTab] = useState("experience");
	const [selected, setSelected] = useState(null);

	const {
		data: items = [],
		isLoading: itemsLoading,
	} = useAdminContent(tab);

	const {
		data: technologies = [],
	} = useTechnologies();

	const {
		createItem,
		updateItem,
		deleteItem,
	} = useAdminContentMutations(tab);

	const getDefaultValues = (tab) => { switch (tab) { case "experience": return { position: "", company: "", companyUrl: "", location: "", description: "", tech: [], achievements: [""], startDate: "", endDate: "", isCurrent: false, order: 0, isVisible: true, }; case "education": return { institution: "", degree: "", description: "", startDate: "", endDate: "", isCurrent: false, order: 0, isVisible: true, }; case "languages": return { name: "", code: "", level: "", description: "", order: 0, isVisible: true, }; default: return {}; } };

	const {
		register,
		handleSubmit,
		reset,
		control,
		setError,
		formState: { errors },
	} = useForm({
		shouldUnregister: true,
		defaultValues: getDefaultValues("experience"),
	});

	const { fields, append, remove, } = useFieldArray({ control, name: "achievements", });

	useEffect(() => {
		setSelected(null);
		reset(getDefaultValues(tab));
	}, [tab, reset]);

	const handleSelect = (item) => {
		setSelected(item);
		reset({
			...item,
			tech: item.tech?.map(t => typeof t === "string" ? t : t._id) || [],
			startDate: item.startDate?.slice(0, 10),
			endDate: item.endDate?.slice(0, 10),
		});
	};

	const handleCreateNew = () => {
		setSelected(null);
		reset(getDefaultValues(tab));
	};

	const onSubmit = async (values) => {
		let savedItem;
		try {
			if (selected?._id) {
				savedItem = await updateItem.mutateAsync({ id: selected._id, data: values });
			} else {
				savedItem = await createItem.mutateAsync(values);
			}
			setSelected(savedItem);
			reset(savedItem);
		} catch (error) {
			if (error.fieldErrors) {
				Object.entries(error.fieldErrors).forEach(([field, message]) => {
					setError(field, { type: "server", message });
				});
			}
		}
	};

	const handleDelete = async (id) => {
		if (!confirm("Удалить запись?")) {
			return;
		}
		await deleteItem.mutateAsync(id);
		if (selected?._id === id) {
			setSelected(null);
			reset(getDefaultValues(tab));
		}
	};

	return (
		<div className="space-y-6">
			{/* Tabs */}
			<div className="flex flex-wrap gap-2">
				{TABS.map((t) => {
					const Icon = t.icon;
					return (
						<button
							key={t.value}
							onClick={() => setTab(t.value)}
							className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${tab === t.value
								? "border-accent-400 bg-accent-400/10 text-accent-400"
								: "border-white/10 text-dark-400 hover:text-white hover:border-white/20"
								}`}>
							<Icon className="w-4 h-4" />
							{t.label}
						</button>
					);
				})}
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
				{/* Left list */}
				<div className="glass-card p-4 flex flex-col gap-4">
					<button
						onClick={handleCreateNew}
						className="primary-button w-full flex items-center justify-center gap-2">
						<Plus className="w-4 h-4" />
						Новая запись
					</button>

					<div className="space-y-3 max-h-[70vh] overflow-y-auto">
						{itemsLoading ? (
							<p className="text-dark-400 text-sm">Загрузка...</p>
						) : items.length === 0 ? (
							<p className="text-dark-400 text-sm">Нет записей</p>
						) : (
							items.map((item) => (
								<button
									key={item._id}
									onClick={() => handleSelect(item)}
									className={`w-full text-left p-4 rounded-xl border transition-colors ${selected?._id === item._id
										? "border-accent-400 bg-accent-400/5"
										: "border-white/10 hover:border-white/20"
										}`}>
									<div className="flex items-start justify-between gap-3">
										<div className="min-w-0 flex-1">
											<p className="text-white font-medium truncate">
												{tab === "experience" && item.position}
												{tab === "education" && item.institution}
												{tab === "languages" && item.name}
											</p>

											<p className="text-dark-400 text-sm truncate">
												{tab === "experience" && item.company}
												{tab === "education" && item.degree}
												{tab === "languages" && item.level}
											</p>
										</div>
										<span
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(item._id);
											}}
											className="text-red-400 hover:text-red-300 p-1">
											<Trash2 className="w-4 h-4" />
										</span>
									</div>
								</button>
							))
						)}
					</div>
				</div>

				{/* Right form */}
				<form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 space-y-5">
					<div>
						<h2 className="text-2xl font-bold text-white">
							{selected ? "Редактирование" : "Создание записи"}
						</h2>
						<p className="text-dark-400 text-sm mt-1">
							{TABS.find(t => t.value === tab)?.label}
						</p>
					</div>

					{/* EXPERIENCE */}
					{tab === "experience" && (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-dark-300 mb-2">Должность</label>
									<input {...register("position")} className="input-field" />
								</div>

								<div>
									<label className="block text-sm text-dark-300 mb-2">Компания</label>
									<input {...register("company")} className="input-field" />
								</div>
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2">Локация</label>
								<input {...register("location")} className="input-field" />
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2">Описание</label>
								<textarea {...register("description")} rows={5} className="input-field resize-none" />
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2"> Технологии </label>
								<Controller control={control} name="tech" render={({ field }) => (<TechnologySelect technologies={technologies} value={field.value || []} onChange={field.onChange} />)} />
								{errors.tech && (<p className="text-sm text-red-400 mt-1"> {errors.tech.message} </p>)}
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<label className="block text-sm text-dark-300"> Достижения
									</label>
									<button type="button" onClick={() => append("")} className="glass-button flex items-center gap-2 text-sm px-3 py-2" >
										<Plus className="w-4 h-4" />
										Добавить
									</button>
								</div>
								{fields.length === 0 && (<p className="text-sm text-dark-400"> Нет достижений </p>)}
								{fields.map((field, index) => (<div key={field.id} className="flex gap-2">
									<input {...register(`achievements.${index}`)} placeholder="Например: Реализовал систему авторизации" className="input-field flex-1" />
									<button type="button" onClick={() => remove(index)} className="w-11 h-11 flex items-center justify-center rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors" >
										<Trash2 className="w-4 h-4" />
									</button>
								</div>))}
								{errors.achievements && (<p className="text-sm text-red-400"> Проверьте достижения </p>)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-dark-300 mb-2">Начало</label>
									<input type="date" {...register("startDate")} className="input-field" />
								</div>

								<div>
									<label className="block text-sm text-dark-300 mb-2">Окончание</label>
									<input type="date" {...register("endDate")} className="input-field" />
								</div>
							</div>
						</>
					)}

					{/* EDUCATION */}
					{tab === "education" && (
						<>
							<div>
								<label className="block text-sm text-dark-300 mb-2">Учебное заведение</label>
								<input {...register("institution")} className="input-field" />
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2">Степень / специальность</label>
								<input {...register("degree")} className="input-field" />
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2">Описание</label>
								<textarea {...register("description")} rows={4} className="input-field resize-none" />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-dark-300 mb-2">Начало</label>
									<input type="date" {...register("startDate")} className="input-field" />
								</div>

								<div>
									<label className="block text-sm text-dark-300 mb-2">Окончание</label>
									<input type="date" {...register("endDate")} className="input-field" />
								</div>
							</div>
						</>
					)}

					{/* LANGUAGES */}
					{tab === "languages" && (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm text-dark-300 mb-2">Язык</label>
									<input {...register("name")} className="input-field" />
								</div>

								<div>
									<label className="block text-sm text-dark-300 mb-2">Код флага</label>
									<input {...register("code")} placeholder="US" className="input-field uppercase" />
								</div>
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2">Уровень</label>
								<input {...register("level")} placeholder="B1 / C1 / Носитель" className="input-field" />
							</div>

							<div>
								<label className="block text-sm text-dark-300 mb-2">Описание</label>
								<input {...register("description")} className="input-field" />
							</div>
						</>
					)}

					{/* Common */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm text-dark-300 mb-2">Порядок</label>
							<input type="number" {...register("order")} className="input-field" />
						</div>

						<label className="flex items-center gap-2 text-dark-300 mt-8">
							<input type="checkbox" {...register("isVisible")} />
							Показывать на сайте
						</label>

						<label className="flex items-center gap-2 text-dark-300 mt-8">
							<input type="checkbox" {...register("isCurrent")} />
							isCurrent?
						</label>
					</div>

					<div className="flex gap-3 pt-4 border-t border-white/10">
						<button type="submit" className="primary-button flex items-center gap-2">
							<Save className="w-4 h-4" />
							Сохранить
						</button>

						<button
							type="button"
							onClick={handleCreateNew}
							className="glass-button">
							Новая запись
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}