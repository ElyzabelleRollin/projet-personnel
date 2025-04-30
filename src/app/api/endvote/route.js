// app/api/endvote/route.js

export async function GET(request) {
  // Exemple : exécuter une action serveur ici
  console.log("Vote terminé !");

  return new Response("Vote terminé !", { status: 200 });
}
