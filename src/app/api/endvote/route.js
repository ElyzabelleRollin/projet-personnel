//Imports:
import { runEndVote } from "@/app/_lib/endvote";

//Function to run the end vote:
export async function GET(request) {
  await runEndVote(); //Run the end vote function
  return new Response("Vote terminé !", { status: 200 }); //Return a response with status 200 when completed
}
