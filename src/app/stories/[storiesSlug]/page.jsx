import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/stories/readstories.module.css";
import H1 from "@/app/_components/global/h1";

const StoryPage = async ({ params }) => {
  const { storiesSlug } = await params;
  const supabase = await createClient();
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

  const { data: ideas } = await supabase
    .from("proposals")
    .select("*")
    .eq("story_id", story.id)
    .order("created_at", { ascending: true });

  function CalculateDelais(story) {
    const currentTime = Date.now();
    const creationTime = Date.parse(story.latest_update_time);
    const timeDifference = currentTime - creationTime;
    return timeDifference;
  }

  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <H1 content={story.title} />
        <p>
          <span className={styles.subtitle}>Collaborateurs:</span>{" "}
          <span className={styles.collaboratorsNames}>
            {story.author} {story.collaborators}
          </span>
        </p>
        <div className={styles.storyContainer}>
          {story.story.map((text) => (
            <p className={styles.text} key={text}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
