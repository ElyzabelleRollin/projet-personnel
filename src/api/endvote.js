// api/endvote.js
import { EndVoteAction } from "@/app/_actions/endvote";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await EndVoteAction();
    res.status(200).json({ message: "Vote ended successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error ending vote", error: error.message });
  }
}
