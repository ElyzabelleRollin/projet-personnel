import React from "react";
import { addLikeAction } from "@/app/_actions/proposals";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "../stories/readstories.module.css";

const Propositions = async ({ idea, storySlug, votingDurationMinutes, storyUpdatedAt }) => {
  const supabase = await createClient();
  const { data, error } = await supabase
  .from("liked_proposals")
  .select("*")
  .eq("proposal_id", idea.id);

  const currentTime = Date.now();
  const creationTime = Date.parse(storyUpdatedAt);

  function CalculateDelais(){
    const timeDifference = currentTime - creationTime;
    return timeDifference;
  }

  return (
    <div key={idea.id} className={styles.ideas}>
      <p>{idea.text}</p>
      <p>{idea.author}</p>
      <p>{idea.created_at.slice(0, 10)}</p>
      {CalculateDelais() < votingDurationMinutes * 60 * 1000 ? (
        <form action={addLikeAction}>
          <input type="hidden" name="proposalId" value={idea.id} />
          <input type="hidden" name="storySlug" value={storySlug} />
          <button>{data.length} 👍</button>
        </form>
      ) :(
        <p>{data.length} 👍</p>
      )}
    </div>
  );
};

export default Propositions;
