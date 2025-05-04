//Imports:
import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/profile/profile.module.css";
import H1 from "@/app/_components/global/h1";
import DisplayStories from "@/app/_components/stories/displaystories";

//Page to display the user profile:
const UserProfilePage = async ({ params }) => {
  const { userId } = await params; //Get the user id from the url
  const supabase = await createClient(); //Access Supabase

  //Get the stories data from Supabase:
  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("author", userId);

  //Get the user data from Supabase:
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  //Get the liked stories data from Supabase:
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
            <li>
              Nombre de propositions soumises:{" "}
              {user.proposals_request_number
                ? user.proposals_request_number
                : 0}
            </li>
            <li>
              Nombre de propositions acceptées:{" "}
              {user.accepted_proposals_number
                ? user.accepted_proposals_number
                : 0}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
