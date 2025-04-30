import React from "react";
import { addLikeAction } from "@/app/_actions/proposals";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/propositions/propositions.module.css";

const Propositions = async ({
  idea,
  storySlug,
  votingDurationMinutes,
  storyUpdatedAt,
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("liked_proposals")
    .select("*")
    .eq("proposal_id", idea.id);

  const { data: authorName, errorAuthorName } = await supabase
    .from("users")
    .select("username")
    .eq("id", idea.author)
    .single();

  function CalculateDelais(storyLatestUpdate) {
    const currentTime = Date.now();
    const creationTime = Date.parse(storyLatestUpdate);
    const timeDifference = currentTime - creationTime;
    return timeDifference;
  }

  return (
    <div key={idea.id} className={styles.ideas}>
        <form className={styles.voteForm} action={addLikeAction}>
          <button>{data.length} 👍</button>
          <input type="hidden" name="proposalId" value={idea.id} />
          <input type="hidden" name="storySlug" value={storySlug} />
        </form>
      
      <p>{idea.text}</p>
      <div className={styles.infos}>
        <p>
          <span className={styles.writingBy}>Écrit par: </span>
          {authorName.username}
        </p>
        <p className={styles.date}>{idea.created_at.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default Propositions;
