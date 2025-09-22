import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Aucune session active" },
        { status: 401 }
      );
    }

    // NextAuth gère automatiquement la déconnexion via la session
    // Cette route peut être utilisée pour des actions supplémentaires
    // comme nettoyer les cookies personnalisés, etc.

    return NextResponse.json(
      { message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
} 