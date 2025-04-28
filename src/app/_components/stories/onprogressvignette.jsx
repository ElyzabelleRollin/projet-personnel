import React from "react";
import styles from "@/app/_components/stories/onprogessvignette.module.css";
import { createClient } from "@/app/_lib/supabase/server";

const onprogressvignette = ({ story }) => {
  const supabase = createClient();

  return (
    <a
      href={
        story.is_completed
          ? `/stories/${story.slug}/`
          : `/stories/${story.slug}/read`
      }
    >
      <div className={styles.vignette}>
        <div className={styles.infosContainer}>
          <p className={styles.storyTitle}>{story.title}</p>
          <p>
            <span className={styles.collaborateurs}>Collaborateurs:</span> {}
          </p>
        </div>
      </div>
    </a>
  );
};

export default onprogressvignette;
