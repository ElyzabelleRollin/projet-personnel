import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import { createNewProposalAction } from "@/app/_actions/proposals";
import styles from "@/app/_components/stories/readstories.module.css";
import Propositions from "@/app/_components/propositions/propositions";

const ReadStoryPage = async ({ params }) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <h1>{story.title}</h1>
        <p>{story.author}</p>
        <p>{story.created_at.slice(0, 10)}</p>

        {story.story.map((text)=>(
          <p key={text}>{text}</p>
        ))}
      </div>
      <div className={styles.proposalsContainer}>
        <div className={styles.ideasContainer}>
          {ideas.map((idea) => (
            <Propositions idea={idea} key={idea.id} storySlug={storiesSlug} votingDurationMinutes={story.voting_duration_minutes} storyUpdatedAt={story.latest_update_time} />
          ))}
        </div>
        {ideas.length < story.suggestions_limit && (
        <form
          action={createNewProposalAction}
          className={styles.propositionForm}
        >
          <label htmlFor="proposal">Entrer votre proposition:</label>
          <input type="text" id="proposal" name="proposal" />
          <input type="hidden" id="storyId" name="storyId" value={story.id} />
          <input
            type="hidden"
            id="storySlug"
            name="storySlug"
            value={storiesSlug}
          />
          <button type="submit">Envoi</button>
        </form>
        )}
      </div>
    </div>
  );
};

export default ReadStoryPage;
