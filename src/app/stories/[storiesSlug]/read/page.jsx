import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import {createNewProposalAction} from "@/app/_actions/proposals";
import styles from "@/app/_components/stories/readstories.module.css";

const ReadStoryPage = async ({ params }) => {
  const { storiesSlug } = await params; //Get the slug of the quiz
  const supabase = await createClient();
  const { data: story, storyError } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

  const { data: ideas, ideasError } = await supabase
    .from("proposals")
    .select("*")
    .eq("story_id", story.id)
    .order('created_at', { ascending: true });

    const {data: user, userError} = await supabase
    .from("users")
    .select("*")
    .eq("id", story.author)
    .single();

  return (
    <div className={styles.container}>
      {/* Block for story infos */}
      <div className={styles.storyInfos}>
        <h1>{story.title}</h1>
        <p>{story.author}</p>
        <p>{story.created_at.slice(0, 10)}</p>
        <p>{story.story.firstSentence}</p>
      </div>
      {/* Block for proposals */}
      <div className={styles.proposalsContainer}>
      {/* Block to display all the existing ideas */}
        <div className={styles.ideasContainer}>
          {ideas.map((idea) => (
            <div key={idea.id} className={styles.ideas}>
              <p>{idea.text}</p>
              <p>{idea.author}</p>
              <p>{idea.created_at.slice(0,10)}</p>
            </div>
          ))}
        </div>
        <form action={createNewProposalAction} className={styles.propositionForm}>
          <label htmlFor="proposal">Entrer vote proposition:</label>
          <input type="text" id="proposal" name="proposal"/>
          <input type="hidden" id="storyId" name="storyId" value={story.id}/>
          <input type="hidden" id="storySlug" name="storySlug" value={storiesSlug}/>
          <button>Envoi</button>
        </form>
      </div>
    </div>
  );
};

export default ReadStoryPage;
