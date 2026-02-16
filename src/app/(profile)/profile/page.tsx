"use client";

import { useAuth } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold">Perfil</h1>

      <p>Email: {user.email}</p>
      <p>Verified: {user.verified ? "Sim" : "Não"}</p>
      <p>Role: {user.role}</p>

      {!user.verified && (
        <Button onClick={() => router.push("/verified")}>
          Verificar Conta
        </Button>
      )}

      <Button variant="outline" onClick={logout}>
        Sair
      </Button>
    </div>
  );
}
