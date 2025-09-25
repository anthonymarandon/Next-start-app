import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Utilisateur non authentifié");
  }

  return session.user;
}
