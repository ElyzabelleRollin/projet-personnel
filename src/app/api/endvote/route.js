// app/api/endvote/route.js
import { EndVoteAction } from "@/app/_actions/endvote";

export async function POST(request) {
  try {
    // Appeler la fonction EndVoteAction pour arrêter le vote
    await EndVoteAction(); // Cette fonction doit être définie ailleurs dans ton code

    // Si l'action est réussie, envoie un message de succès
    return new Response(
      JSON.stringify({ message: "Vote ended successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    // En cas d'erreur, envoie un message d'erreur
    return new Response(
      JSON.stringify({ message: "Error ending vote", error: error.message }),
      { status: 500 }
    );
  }
}
