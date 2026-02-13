import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background">
      <h1 className="text-3xl font-bold">Bem-vindo à Guilda</h1>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Entrar</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/register">Criar Conta</Link>
        </Button>
      </div>
    </div>
  );
}
