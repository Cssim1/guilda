"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/app/providers";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { FormField } from "@/components/form/formField";
import { PasswordField } from "@/components/form/passwordField";

import { loginSchema, LoginFormData } from "@/schemas/login.schema";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fakeUser = {
        id: "1",
        email: data.email,
        role: "user" as const,
        verified: false,
      };

      login(fakeUser);

      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entrar na Guilda</CardTitle>
        <CardDescription>
          Insira suas credenciais para continuar
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            registration={register("email")}
            error={errors.email}
            disabled={isSubmitting}
          />

          <PasswordField
            label="Senha"
            registration={register("password")}
            error={errors.password}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Não tem conta ainda?{" "}
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/register">Registre-se</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
