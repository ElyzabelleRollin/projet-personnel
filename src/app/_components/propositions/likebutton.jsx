//Imports:
"use client";
import React from "react";
import styles from "@/app/_components/propositions/propositions.module.css";
import { addLikeAction } from "@/app/_actions/proposals";
import { useState } from "react";

//Button to like an idea:
const LikeButton = ({ idea, storySlug, isLiked }) => {
  const [selectedButton, setSelectedButton] = useState(isLiked); //State to manage the like button
  return (
    <form className={styles.voteForm} action={addLikeAction}>
      <button
        className={styles.likeButton}
        onClick={() => setSelectedButton(!selectedButton)}
      >
        {idea.likes}{" "}
        {selectedButton ? (
          <img className={styles.heart} src="/img/likedHeart.svg" alt="liked" />
        ) : (
          <img className={styles.heart} src="/img/emptyHeart.svg" alt="empty" />
        )}
      </button>
      <input type="hidden" name="proposalId" value={idea.id} />
      <input type="hidden" name="storySlug" value={storySlug} />
    </form>
  );
};

export default LikeButton;
