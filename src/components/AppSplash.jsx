export function AppSplash({ fadingOut }) {
	return (
		<div className={`fixed inset-0 z-100 flex items-center justify-center bg-dark-950 transition-opacity duration-800 ease-[cubic-bezier(0.7,0,0.84,0)] ${fadingOut ? "opacity-0" : "opacity-100"}`}>
			{/* сюда лого/спиннер */}
			<img
				className="w-26 h-26 object-cover rounded-full opacity-100 animate-glow-splash"
				src="/176997-zhivotnoe_chernyj-kot-datskij_dog-koshachih-chernaya_koshka-360x640.jpg" />
		</div>
	)
}