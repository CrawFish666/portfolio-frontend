import { useFormContext, useWatch } from "react-hook-form";
import Card from "../../../../components/ui/Card";
import { useAvailabilityStatuses } from "../../../../hooks/queries/useAvailabilityStatuses";

export function AvailabilityStatusesSection() {
	const { setValue } = useFormContext();
	const currentStatusId = useWatch({
		name: "availabilityStatus",
	});

	const {
		data: statuses = [],
		isLoading,
		isError,
	} = useAvailabilityStatuses();

	const currentStatus = statuses.find(
		(status) => status._id === currentStatusId
	);

	if (isLoading) {
		return (
			<Card title="Статус доступности">
				<p className="text-dark-400">
					Загрузка статусов...
				</p>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card title="Статус доступности">
				<p className="text-red-400">
					Не удалось загрузить статусы.
				</p>
			</Card>
		);
	}
	return (
		<Card title="Статус доступности">
			<div className="mb-4">
				<span className="block">Текущий статус:</span>
				<span className="flex gap-2 items-center">
					<span
						className="w-2 h-2 rounded-full"
						style={{
							backgroundColor: currentStatus?.color,
						}} />

					<span>
						{currentStatus?.title ?? "Не выбран"}
					</span>
				</span>
			</div>

			<select
				value={currentStatusId ?? ""}
				onChange={(event) => {
					setValue("availabilityStatus", event.target.value,
						{
							shouldDirty: true,
							shouldValidate: true,
						}
					);
				}}
				className="input-field">
				<option value="">Выберите статус</option>

				{statuses.map((status) => (
					<option
						key={status._id}
						value={status._id}>
						{status.title}
					</option>
				))}
			</select>
		</Card>
	);
}