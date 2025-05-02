import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/profile/profile.module.css";
import H1 from "@/app/_components/global/h1";
import DisplayStories from "@/app/_components/stories/displaystories";

const UserProfilePage = async ({ params }) => {
  const { userId } = await params;
  const supabase = await createClient();

  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("author", userId);

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  const { data: likedStories } = await supabase
    .from("liked_stories")
    .select("stories(*)")
    .eq("user_id", userId);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userInfosContainer}>
        <div className={styles.profileImg}>
          <img src={user.avatar} alt={user.username} />
        </div>
        <div className={styles.userInfos}>
          <H1 content={user.username} />
          <p>Membre depuis: {user.created_at.slice(0, 10)}</p>
        </div>
      </div>

      <div className={styles.storiesContainer}>
        <DisplayStories stories={stories} likedStories={likedStories} />
        <div className={styles.listOfInfos}>
          <ul className={styles.list}>
            <li>Oeuvre la plus aimée: </li>
            <li>
              Nombre de propositions envoyées: {user.proposals_request_number}
            </li>
            <li>
              Nombre de propositions acceptées: {user.accepted_proposals_number}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
