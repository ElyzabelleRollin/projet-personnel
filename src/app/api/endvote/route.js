import { runEndVote } from "@/app/_lib/endvote";

export async function GET(request) {
  await runEndVote();
  return new Response("Vote terminé !", { status: 200 });
}
