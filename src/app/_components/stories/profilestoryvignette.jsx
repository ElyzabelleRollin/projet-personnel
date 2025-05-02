import React from "react";
import styles from "@/app/_components/stories/profilestoryvignette.module.css";

const ProfileStoryVignette = ({ story, typeNeeded }) => {
  const shouldDisplay =
    (typeNeeded === "ongoing" && !story.is_completed) ||
    (typeNeeded === "completed" && story.is_completed) ||
    typeNeeded === "favorite";

  if (typeNeeded === "favorite") console.log("[FAVORITE]", story);

  if (!shouldDisplay) return null;

  return (
    <div className={styles.vignette}>
      <img src={story.image_url} alt={story.title} />
      <div className={styles.infosContainer}>
        <p className={styles.storyTitle}>{story.title}</p>
        {story.is_completed ? (
          <a className={styles.link} href={`/stories/${story.slug}`}>
            Lire
          </a>
        ) : (
          <a className={styles.link} href={`/stories/${story.slug}/read`}>
            Consulter
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileStoryVignette;
