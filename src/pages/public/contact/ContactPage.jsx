import { ContactIntro } from "./components/ContactIntro";
import { ContactAvailabilityCard } from "./components/ContactAvailabilityCard";
import { ContactInfoList } from "./components/ContactInfoList";
import { ContactSocials } from "./components/ContactSocials";
import { ContactForm } from "./components/ContactForm";
import { useSettings } from "../../../hooks/queries/useSettings";

export function ContactPage() {

	const {
		data: settings = null,
		isLoading,
		isError,
	} = useSettings();

	const emailContact = settings?.contacts?.find(
		(contact) => contact.type === "email" && contact.isActive
	);

	const location = settings?.profile?.location;



	return (
		<div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 min-h-[100dvh]">
			<ContactIntro />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<div className="space-y-8">

					<ContactAvailabilityCard settings={settings} isLoading={isLoading}/>

					<ContactInfoList emailContact={emailContact} location={location} />

					<ContactSocials contacts={settings?.contacts ?? []} />
				</div>

				<ContactForm />
			</div>
		</div>
	)
}