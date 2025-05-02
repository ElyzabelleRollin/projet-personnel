// Imports:
import styles from "@/app/_components/stories/onprogessvignette.module.css";
import LikeStoryButton from "./likestorybutton";
import { createClient } from "@/app/_lib/supabase/server";

// Used to display the vignette of a story:
const OnProgressVignette = async ({ story }) => {
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Check if story as been liked by the user:
  const { data: likedStory, error } = await supabase
    .from("liked_stories")
    .select("*")
    .eq("story_id", story.id)
    .eq("user_id", userConnected.id)
    .single();

  return story.is_completed ? (
    <a className={styles.link} href={`/stories/${story.slug}`}>
      <div className={styles.vignette}>
        <img src={story.image_url} alt={story.title} className={styles.image} />
        <div className={styles.infosContainer}>
          <p className={styles.storyTitle}>{story.title}</p>
        </div>
      </div>
      <LikeStoryButton story={story} isLiked={likedStory != null} />
    </a>
  ) : (
    <a href={`/stories/${story.slug}/read`}>
      <div className={styles.vignette}>
        <img src={story.image_url} alt={story.title} className={styles.image} />
        <div className={styles.infosContainer}>
          <p className={styles.storyTitle}>{story.title}</p>
        </div>
      </div>
    </a>
  );
};

export default OnProgressVignette;
