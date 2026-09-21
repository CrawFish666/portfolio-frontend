import { forwardRef } from "react";
import { cn } from "../../../utils/cn";

const Input = forwardRef(({
	label,
	error,
	helperText,
	leftIcon,
	rightIcon,
	className,
	fullWidth = true,
	...props
}, ref) => {

	return (
		<div className={cn(fullWidth && "w-full")}>
			{label && (
				<label className="mb-2 block text-sm font-medium text-dark-200">
					{label}
				</label>
			)}
			<div className="relative">
				{leftIcon && (
					<div className="absolute left-3 top-1/2 -translate-y-1/2">
						{leftIcon}
					</div>
				)}
				<input
					ref={ref}
					className={cn("input-field", leftIcon && "pl-10", rightIcon && "pr-10", error
						? "border-red-500 focus:border-red-500"
						: "border-dark-700 focus:border-primary",
						className
					)}
					{...props}
				/>

				{rightIcon && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						{rightIcon}
					</div>
				)}

			</div>

			{helperText && (
				<p
					className={cn("mt-2 text-sm", error
						? "text-red-500"
						: "text-dark-400"
					)}
				>
					{helperText}
				</p>
			)}

		</div>
	);

});

Input.displayName = "Input";

export default Input;