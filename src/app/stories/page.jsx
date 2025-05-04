//Imports:
import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import TitleContainer from "@/app/_components/global/titlecontainer";
import styles from "@/app/_components/stories/helpastorypage.module.css";
import OnProgressVignette from "@/app/_components/stories/onprogressvignette";

//Page to display the completed stories:
const StoriesPage = async () => {
  const supabase = await createClient(); //Access Supabase
  //Get the completed stories:
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("is_completed", true);
  return (
    <div className={styles.pageContainer}>
      <TitleContainer title={"Histoires terminées"} />
      <div className={styles.vignettesContainer}>
        {stories.map((story) => (
          <OnProgressVignette key={story.slug} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
