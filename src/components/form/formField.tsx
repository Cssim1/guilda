import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
 	label: string;
	registration: UseFormRegisterReturn;
	error?: FieldError;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

export function FormField({
	label,
	registration,
	error,
	type = "text",
	placeholder,
	disabled,
	maxLength,
	inputMode,
}: FormFieldProps) {
  	return (
		<div className="space-y-2">
		<Label>{label}</Label>

		<Input
			{...registration}
			type={type}
			placeholder={placeholder}
			disabled={disabled}
			maxLength={maxLength}
			inputMode={inputMode}
			aria-invalid={!!error}
		/>

		{error && (
			<p className="text-sm text-destructive">
			{error.message}
			</p>
		)}
		</div>
	);
}
