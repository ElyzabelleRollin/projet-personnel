import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import styles from "@/app/_components/stories/readstories.module.css";
import H1 from "@/app/_components/global/h1";
import AudioPlayer from "@/app/_components/stories/audioplayer";

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

  // Récupération des noms d'utilisateurs pour chaque collaborateur
  const users = await Promise.all(
    story.collaborators.map(async (collaboratorId) => {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, username")
        .eq("id", collaboratorId)
        .single();

      if (error || !user) {
        console.error(
          "Erreur de récupération utilisateur pour:",
          collaboratorId,
          error
        );
        return null;
      }

      return { id: user.id, username: user.username };
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <H1 content={story.title} />
        <p>
          <span className={styles.subtitle}>Collaborateurs:</span>{" "}
          <span className={styles.collaboratorsNames}>
            {users.filter(Boolean).map((user, index, arr) => (
              <React.Fragment key={user.id}>
                <a href={`/profiles/${user.id}`} className={styles.link}>
                  {user.username}
                </a>
                {index < arr.length - 1 && ", "}
              </React.Fragment>
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
