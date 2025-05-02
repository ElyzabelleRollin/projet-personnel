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

  console.log(user.avatar);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.userInfosContainer}>
        <div className={styles.profileImg}>
          <img src={user.avatar} alt={user.username} />
        </div>
        <div className={styles.userInfos}>
          <H1 content={user.username} />
          <p>Membre depuis: </p>
        </div>
      </div>
      <DisplayStories stories={stories} likedStories={likedStories} />
    </div>
  );
};

export default UserProfilePage;
