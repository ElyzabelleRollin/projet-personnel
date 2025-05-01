import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import TitleContainer from "@/app/_components/global/titlecontainer";
import styles from "@/app/_components/stories/helpastorypage.module.css";
import OnProgressVignette from "@/app/_components/stories/onprogressvignette";

const Helpastory = async () => {
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("is_completed", false);
  return (
    <div className={styles.pageContainer}>
      <TitleContainer title={"Histoires en attente d'aide"} />
      <div className={styles.vignettesContainer}>
        {stories.map((story) => (
          <OnProgressVignette key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Helpastory;
