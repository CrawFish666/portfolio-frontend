import { useFormContext } from "react-hook-form";

import Input from "./Input";

const InputField = ({
	name,
	registerOptions,
	...props
}) => {

	const {
		register,
		formState: { errors },
	} = useFormContext();

	const error = name.split(".").reduce((obj, key) => obj?.[key], errors);

	return (
		<Input
			{...props}
			{...register(name, registerOptions)}
			error={!!error}
			helperText={error?.message}
		/>
	);

};

export default InputField;