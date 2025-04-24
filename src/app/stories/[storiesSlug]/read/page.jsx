import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import { createNewProposalAction } from "@/app/_actions/proposals";
import styles from "@/app/_components/stories/readstories.module.css";
import Propositions from "@/app/_components/propositions/propositions";
import Button from "@/app/_components/global/button";
import H1 from "@/app/_components/global/h1";

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

    function CalculateDelais(story){
      const currentTime = Date.now();
      const creationTime = Date.parse(story.latest_update_time);
      const timeDifference = currentTime - creationTime;
      return timeDifference;
    }
    

  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <H1 content={story.title}/>
          <p><span className={styles.subtitle}>Collaborateurs:</span> <span className={styles.collaboratorsNames}>{story.author} {story.collaborators}</span></p>
          <div className={styles.storyContainer}>
        {story.story.map((text)=>(
          <p className={styles.text} key={text}>{text}</p>
        ))}
          </div>
      </div>
      <div className={styles.proposalsContainer}>
      {CalculateDelais(story) > story.voting_duration_minutes * 60 * 1000 && (
        <>
          <p className={styles.wait}>En attente d'une décision de l'auteur</p>
        <div className={styles.over}></div>
        </>
      )}
        <div className={styles.proposalsTitle}>
          Consulter les propositions
        </div>
        <div className={styles.ideasContainer}>
          {ideas.map((idea) => (
            <Propositions idea={idea} key={idea.id} storySlug={storiesSlug} votingDurationMinutes={story.voting_duration_minutes} storyUpdatedAt={story.latest_update_time} />
          ))}
        </div>
        {ideas.length < story.suggestions_limit ? (
        <form
          action={createNewProposalAction}
          className={styles.propositionForm}
        >
          <label htmlFor="proposal" className={styles.formTitle}>Proposez votre idée:</label>
          <textarea type="text" id="proposal" name="proposal" className={styles.textInput} placeholder="Écrivez votre idée..."/>
          <input type="hidden" id="storyId" name="storyId" value={story.id} />
          <input
            type="hidden"
            id="storySlug"
            name="storySlug"
            value={storiesSlug}
          />
          <Button content={"Envoyer"}/>
        </form>
        ):(
          <form
          className={styles.propositionForm}
        >
          <label htmlFor="proposal" className={styles.formTitle}>La limite des propositions a été atteinte.</label>
          <textarea type="text" id="proposal" name="proposal" disabled className={styles.textInputDisabled} placeholder="Écrivez votre idée..."/>
          <Button content={"Envoyer"}/>
        </form>
        )}
      </div>
    </div>
  );
};

export default ReadStoryPage;
