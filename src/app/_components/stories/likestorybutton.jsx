//Imports:
"use client";
import { likeStoryAction } from "@/app/_actions/stories";
import styles from "@/app/_components/stories/onprogessvignette.module.css";
import { useState } from "react";

//Button to like a story:
const LikeStoryButton = ({ story, isLiked }) => {
  //State to manage the like button:
  const [selectedButton, setSelectedButton] = useState(isLiked);
  return (
    <form className={styles.like} action={likeStoryAction}>
      <input type="hidden" name="storyId" value={story.id} />
      <button onClick={() => setSelectedButton(!selectedButton)}>
        {selectedButton ? (
          <img className={styles.heart} src="/img/likedHeart.svg" alt="liked" />
        ) : (
          <img className={styles.heart} src="/img/emptyHeart.svg" alt="empty" />
        )}
      </button>
    </form>
  );
};

export default LikeStoryButton;
