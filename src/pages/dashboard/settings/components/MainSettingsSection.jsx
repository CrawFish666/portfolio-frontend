import { useFormContext } from "react-hook-form";

import Card from "../../../../components/ui/Card";
import InputField from "../../../../components/ui/Input/InputField";

const MainSettingsSection = () => {

	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<Card
			title="Основные настройки"
		>

			<div className="space-y-5">
				<InputField
					label="Город"
					error={errors.profile?.location?.city?.message}
					{...register("profile.location.city")}
				/>

				<InputField
					label="Страна"
					error={errors.profile?.location?.country?.message}
					{...register("profile.location.country")}
				/>

				<InputField
					type="number"
					label="Опыт (лет)"
					error={errors.profile?.experienceYears?.message}
					{...register("profile.experienceYears", {
						valueAsNumber: true,
					})}
				/>

				<InputField
					label="Емайл для пересылки из Feedback"
					error={errors.feedbackSettings?.notificationEmail?.message}
					{...register("feedbackSettings.notificationEmail")}
				/>

				<label className="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
						{...register("feedbackSettings.sendEmailNotification")} />
					<span className="text-sm font-medium"> Получать уведомления о новых Feedback на почту </span>
				</label>

			</div>

		</Card>
	);
};

export default MainSettingsSection;