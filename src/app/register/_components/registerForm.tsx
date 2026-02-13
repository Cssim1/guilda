"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
	const router = useRouter();

	const [name, setName] = useState("");

	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [discordNick, setDiscordNick] = useState("");
	const [discordTag, setDiscordTag] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (email !== confirmEmail) {
			setError("Os emails não coincidem.");
			return;
		}

		if (password !== confirmPassword) {
			setError("As senhas não coincidem.");
			return;
		}

		if (!/^\d{4}$/.test(discordTag)) {
			setError("A tag do Discord deve conter 4 números.");
			return;
		}

		setLoading(true);

		try {
			console.log({
				name,
				email,
				password,
				discord: `${discordNick}#${discordTag}`,
			});

			await new Promise((resolve) => setTimeout(resolve, 1000));

			router.push("/login");
		} catch (err) {
			setError("Erro ao criar conta.");
		} finally {
			setLoading(false);
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
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<p className="text-sm text-destructive">
							{error}
						</p>
					)}

					<div className="space-y-2">
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={loading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={loading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmEmail">Confirmar Email</Label>
						<Input
							id="confirmEmail"
							type="email"
							required
							value={confirmEmail}
							onChange={(e) => setConfirmEmail(e.target.value)}
							disabled={loading}
						/>
					</div>

					<div className="space-y-2">
						<Label>Discord</Label>
						<div className="flex gap-2">
							<Input
								placeholder="Nick"
								required
								value={discordNick}
								onChange={(e) => setDiscordNick(e.target.value)}
								disabled={loading}
							/>
							<Input
								placeholder="1234"
								maxLength={4}
								required
								value={discordTag}
								onChange={(e) =>
									setDiscordTag(
										e.target.value.replace(/\D/g, "")
									)
								}
								disabled={loading}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Senha</Label>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirmar Senha</Label>
						<Input
							id="confirmPassword"
							type="password"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							disabled={loading}
						/>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={loading}
					>
						{loading ? "Criando conta..." : "Criar Conta"}
					</Button>

					<div className="text-center text-sm text-muted-foreground">
						Já tem conta?{""}
						<Button variant="link" className="p=0 h-auto" asChild>
							<Link href="/login">Entrar</Link>
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
