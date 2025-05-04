//Imports:
import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/propositions/propositions.module.css";
import LikeButton from "@/app/_components/propositions/likebutton";

//Component to display the propositions:
const Propositions = async ({ idea, storySlug }) => {
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Check if the user has already liked the idea:
  const { data: likedProposals, error } = await supabase
    .from("liked_proposals")
    .select("*")
    .eq("proposal_id", idea.id)
    .eq("user_id", userConnected.id)
    .single();

  //Check if the user has already liked the idea and set isLiked to true or false:
  const isLiked = likedProposals === null ? false : true;

  //Get the author name:
  const { data: authorName, errorAuthorName } = await supabase
    .from("users")
    .select("username")
    .eq("id", idea.author)
    .single();
  if (errorAuthorName) console.log(errorAuthorName); //If there is an error, log an error

  return (
    <div key={idea.id} className={styles.ideas}>
      <LikeButton idea={idea} storySlug={storySlug} isLiked={isLiked} />
      <p>{idea.text}</p>
      <div className={styles.infos}>
        <p>
          <span className={styles.writingBy}>Rédigé par: </span>
          <span className={styles.author}>{authorName.username}</span>
        </p>
        <p className={styles.date}>{idea.created_at.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default Propositions;
