import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/propositions/propositions.module.css";
import LikeButton from "@/app/_components/propositions/likebutton";

const Propositions = async ({ idea, storySlug }) => {
  const supabase = await createClient();

  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  const { data: likedProposals, error } = await supabase
    .from("liked_proposals")
    .select("*")
    .eq("proposal_id", idea.id)
    .eq("user_id", userConnected.id)
    .single();
  if (error) console.log(error);

  const isLiked = likedProposals === null ? false : true;

  const { data: authorName, errorAuthorName } = await supabase
    .from("users")
    .select("username")
    .eq("id", idea.author)
    .single();

  return (
    <div key={idea.id} className={styles.ideas}>
      <LikeButton idea={idea} storySlug={storySlug} isLiked={isLiked} />

      <p>{idea.text}</p>
      <div className={styles.infos}>
        <p>
          <span className={styles.writingBy}>Écrit par: </span>
          <span className={styles.author}>{authorName.username}</span>
        </p>
        <p className={styles.date}>{idea.created_at.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default Propositions;
