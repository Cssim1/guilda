"use client";

import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormPasswordFieldProps {
	label: string;
	registration: UseFormRegisterReturn;
	error?: FieldError;
	disabled?: boolean;
}

export function PasswordField({
	label,
	registration,
	error,
	disabled,
}: FormPasswordFieldProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="space-y-2">
		<Label>{label}</Label>

		<div className="relative">
			<Input
				{...registration}
				type={showPassword ? "text" : "password"}
				disabled={disabled}
				aria-invalid={!!error}
				className="pr-10"
			/>

			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute right-0 top-0 h-full px-3"
				onClick={() => setShowPassword((prev) => !prev)}
				disabled={disabled}
			>
			{showPassword ? "Ocultar" : "Mostrar"}
			</Button>
		</div>

		{error && (
			<p className="text-sm text-destructive">
				{error.message}
			</p>
		)}
		</div>
	);
}
