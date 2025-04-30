import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/profile/profile.module.css";
import H1 from "@/app/_components/global/h1";
import OnProgressVignette from "@/app/_components/stories/onprogressvignette";
import ProfileStoryVignette from "@/app/_components/stories/profilestoryvignette";

const UserProfilePage = async () => {
  const supabase = await createClient();
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("author", userConnected.id);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userInfosContainer}>
        <div className={styles.profileImg}>
          <img src={userConnected.user_metadata.avatar_url} alt="" />
        </div>
        <div className={styles.userInfos}>
          <H1 content={userConnected.user_metadata.user_name} />
          <p>Membre depuis: </p>
        </div>
      </div>
      <div className={styles.sectionContainer}>
        {userConnected.id == stories[0].author ? (
          <div className={styles.myStoriesContainer}>
            Histoires créées:
            <div className={styles.vignettesContainer}>
              {stories.map((story) => (
                <div key={story.slug}>
                  <ProfileStoryVignette story={story} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.myStoriesContainer}>
            Histoires créées par {userConnected.user_metadata.user_name}:
            <div className={styles.vignettesContainer}>
              {stories.map((story) => (
                <OnProgressVignette key={story.slug} story={story} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
