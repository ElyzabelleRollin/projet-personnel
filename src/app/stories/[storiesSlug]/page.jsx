//Imports:
import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/stories/readstories.module.css";
import H1 from "@/app/_components/global/h1";
import AudioPlayer from "@/app/_components/stories/audioplayer";

//Page to display a story when it's completed:
const StoryPage = async ({ params }) => {
  const { storiesSlug } = await params; //Get the slug of the story from the url
  const supabase = await createClient(); //Access Supabase
  //Get the story data from Supabase:
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

  //Promise.all to get the usernames of the collaborators:
  const users = await Promise.all(
    story.collaborators.map(async (collaboratorId) => {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, username")
        .eq("id", collaboratorId)
        .single();
      //If there is an error, log an error:
      if (error || !user) {
        console.error(
          "Erreur de récupération utilisateur pour:",
          collaboratorId,
          error
        );
        return null;
      }

      return { id: user.id, username: user.username }; //Return the user data
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <H1 content={story.title} />
        <p>
          <span className={styles.subtitle}>Collaborateurs:</span>{" "}
          <span className={styles.collaboratorsNames}>
            {/* Create a new array with unique users and map over it to display the usernames */}
            {[
              ...new Map(
                users.filter(Boolean).map((user) => [user.id, user])
              ).values(),
            ].map((user, index, arr) => (
              <>
                <a
                  href={`/profiles/${user.id}`}
                  className={styles.link}
                  key={user.id}
                >
                  {user.username}
                </a>
                {/* Add a comma if it's not the last user */}
                {index < arr.length - 1 && ", "}{" "}
              </>
            ))}
          </span>
        </p>
        <div className={styles.storyContainer}>
          {story.story.map((text, i) => {
            const authorId = story.collaborators[i];
            const author = users.find((user) => user?.id === authorId);

            return (
              <div key={text} className={styles.storySegment}>
                <p className={styles.text}>{text}</p>
                <div className={styles.tooltip}>
                  i
                  <span className={styles.tooltipText}>
                    Paragraphe écrit par:{" "}
                    {author ? (
                      <a
                        href={`/profiles/${author.id}`}
                        className={styles.link}
                      >
                        {author.username}
                      </a>
                    ) : (
                      "Inconnu"
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.audioContainer}>
        <AudioPlayer imageUrl={story.image_url} audioUrl={story.audio_url} />
      </div>
    </div>
  );
};

export default StoryPage;
