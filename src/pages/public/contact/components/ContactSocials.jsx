import { SocialLink } from "../../../../components/SocialLink";

export function ContactSocials({ contacts }) {
	if (!contacts?.length) return null;

	return (
		<section>
			<h2 className="text-lg font-medium text-primary mb-4">
				Социальные сети
			</h2>

			<div className="flex gap-3">
				{contacts.map((contact) => (
					<SocialLink
						key={contact._id}
						item={contact}
						customSize={28}
					/>
				))}
			</div>
		</section>
	);
}