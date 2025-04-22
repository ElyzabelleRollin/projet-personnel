import React from "react";
import { addLikeAction } from "@/app/_actions/proposals";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "../stories/readstories.module.css";

const Propositions = async ({ idea, storySlug }) => {
  const supabase = await createClient();
  const { data: proposals, error } = await supabase
    .from("liked_proposals")
    .select("*")
    .eq("proposal_id", idea.id);
  return (
    <div key={idea.id} className={styles.ideas}>
      <p>{idea.text}</p>
      <p>{idea.author}</p>
      <p>{idea.created_at.slice(0, 10)}</p>
      <form action={addLikeAction}>
        <input type="hidden" name="proposalId" value={idea.id} />
        <input type="hidden" name="storySlug" value={storySlug} />
        <button>{proposals.length} 👍</button>
      </form>
    </div>
  );
};

export default Propositions;
