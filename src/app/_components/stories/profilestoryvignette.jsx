//Imports:
import React from "react";
import styles from "@/app/_components/stories/profilestoryvignette.module.css";

//Component to display the right stories for the profile page:
const ProfileStoryVignette = ({ story, typeNeeded }) => {
  //Check which stories should be displayed:
  const shouldDisplay =
    (typeNeeded === "ongoing" && !story.is_completed) ||
    (typeNeeded === "completed" && story.is_completed) ||
    typeNeeded === "favorite";
  if (!shouldDisplay) return null; //If the story should not be displayed, return null

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
            Découvrir
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileStoryVignette;
