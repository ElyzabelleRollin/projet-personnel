import React from "react";
import styles from "@/app/_components/stories/profilestoryvignette.module.css";
import { createClient } from "@/app/_lib/supabase/server";

const profilestoryvignette = ({ story }) => {
  const supabase = createClient();

  function CalculateDelais(story) {
    const currentTime = Date.now();
    const creationTime = Date.parse(story.latest_update_time);
    const timeDifference = currentTime - creationTime;
    return timeDifference;
  }
  return (
    <div className={styles.vignette}>
      <p className={styles.storyTitle}>{story.title}</p>
      {CalculateDelais(story) > story.voting_duration_minutes * 60 * 1000 && (
        <a className={styles.link} href={`/stories/${story.slug}/edit`}>
          Choisir la suite
        </a>
      )}
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
  );
};

export default profilestoryvignette;
