import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MainSettingsSection from "./components/MainSettingsSection";
import { ContactsSettingsSection } from "./components/ContactsSettingsSection";
import { CVSection } from "./components/CVSection";
import { AvailabilityStatusesSection } from "./components/AvailabilityStatusesSection";
import { useSettings } from "../../../hooks/queries/useSettings";
import { useSettingsMutations } from "../../../hooks/mutations/useSettingsMutations";


export function SettingsPage() {

	// const [settings, setSettings] = useState(null);
	// // const [loading, setLoading] = useState(true);
	// const [saving, setSaving] = useState(false);

	const [selectedCV, setSelectedCV] = useState(null);
	const [removeCV, setRemoveCV] = useState(false);

	const methods = useForm({
		mode: "onTouched",
	});

	const { reset, setError } = methods;
	const { isSubmitting, isDirty } = methods.formState;

	const {
		data: settings,
		isLoading,
		isError,
	} = useSettings();

	const {
		updateSettings,
		uploadCV,
		removeCV: removeCVMutation,
	} = useSettingsMutations();

	useEffect(() => {
		if (!settings) {
			return;
		}

		reset({
			...settings,
			availabilityStatus:
				settings.availabilityStatus?._id ??
				settings.availabilityStatus ??
				"",
		});
	}, [settings, reset]);

	// useEffect(() => {
	// 	const loadSettings = async () => {
	// 		try {
	// 			const { data } = await settingsService.get();
	// 			reset(data);
	// 			console.log(data)
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}

	// 	loadSettings();
	// 	// loadSettings().then(data => reset(data));
	// }, [reset]);

	const onSubmit = async (data) => {
		let updatedSettings = data;

		try {
			if (isDirty) {
				updatedSettings = await updateSettings.mutateAsync(data);
			}
			if (removeCV) {
				updatedSettings = await removeCVMutation.mutateAsync();
			}
			if (selectedCV) {
				updatedSettings = await uploadCV.mutateAsync(selectedCV);
			}
			reset(updatedSettings);
			setSelectedCV(null);
			setRemoveCV(false);
		} catch (error) {
			if (error.fieldErrors) {
				Object.entries(error.fieldErrors).forEach(([field, message]) => {
					setError(field, { type: "server", message });
				});
			}
		}
	}

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-white">Настройки сайта</h1>
					<p className="text-dark-400">Управление настройками сайта</p>
				</div>
				<button type="submit" form="settings-form" className="primary-button"
					disabled={
						isSubmitting ||
						updateSettings.isPending ||
						uploadCV.isPending ||
						removeCVMutation.isPending ||
						(!isDirty && !selectedCV && !removeCV)
					}
				>
					Сохранить
				</button>
			</div>
			<FormProvider {...methods}>
				<form
					id="settings-form"
					onSubmit={methods.handleSubmit(onSubmit)}
					noValidate
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<MainSettingsSection />
						<ContactsSettingsSection />

						<CVSection
							selectedCV={selectedCV}
							setSelectedCV={setSelectedCV}
							removeCV={removeCV}
							setRemoveCV={setRemoveCV}
						/>

						<AvailabilityStatusesSection />
					</div>
				</form>
			</FormProvider>
		</div>
	);
}