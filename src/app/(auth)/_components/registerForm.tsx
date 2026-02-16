"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { FormField } from "@/components/form/formField"
import { PasswordField } from "@/components/form/passwordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  registerSchema,
  RegisterFormData,
} from "@/schemas/register.schema";

export function RegisterForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	async function onSubmit(data: RegisterFormData) {
		try {
		console.log({
			name: data.name,
			email: data.email,
			password: data.password,
			discord: `${data.discordNick}#${data.discordTag}`,
		});

		await new Promise((resolve) => setTimeout(resolve, 1000));

		router.push("/login");
		} catch (error) {
		console.error(error);
		}
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Criar Conta</CardTitle>
				<CardDescription>
				Registre-se para acessar a guilda
				</CardDescription>
			</CardHeader>

		<CardContent>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					label="Name"
					registration={register("name")}
					error={errors.name}
					disabled={isSubmitting}
				/>

				<FormField 
					label="Email"
					type="email"
					registration={register("email")}
					error={errors.email}
					disabled={isSubmitting}

				/>

				<FormField 
					label="Confirmar Email"
					type="email"
					registration={register("confirmEmail")}
					error={errors.confirmEmail}
					disabled={isSubmitting}
				/>

				<PasswordField 
					label="Senha"
					registration={register("password")}
					error={errors.password}
					disabled={isSubmitting}
				/>

				<PasswordField 
					label="Confirmar Senha"
					registration={register("confirmPassword")}
					error={errors.confirmPassword}
					disabled={isSubmitting}
				/>

				<div className="space-y-2">
					<Label>Discord</Label>
					<div className="flex gap-2">
						<Input 
							placeholder="Nick"
							{...register("discordNick")}
							disabled={isSubmitting}
						/>

						<Input 
							placeholder="1234"
							maxLength={4}
							{...register("discordTag")}
							disabled={isSubmitting}
						/>
					</div>

					{errors.discordNick && (
						<p className="text-sm text-destructive">
							{errors.discordNick.message}
						</p>
					)}

					{errors.discordTag && (
						<p className="text-sm text-destructive">
							{errors.discordTag.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					className="w-full"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Criando conta..." : "Criar Conta"}
				</Button>

				<div className="text-center text-sm text-muted-foreground">
					Já tem conta?{" "}
					<Button variant="link" className="p-0 h-auto" asChild>
					<Link href="/login">Entrar</Link>
					</Button>
				</div>
			</form>
		</CardContent>
		</Card>
	);
}
