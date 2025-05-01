//Imports:
import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import { createNewProposalAction } from "@/app/_actions/proposals";
import styles from "@/app/_components/stories/readstories.module.css";
import Propositions from "@/app/_components/propositions/propositions";
import Button from "@/app/_components/global/button";
import H1 from "@/app/_components/global/h1";

//Page to read a story and vote on the propositions:
const ReadStoryPage = async ({ params }) => {
  const { storiesSlug } = await params; //Get the slug of the story from the url
  const supabase = await createClient(); //Access Supabase

  //Get the story data from Supabase:
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

  //Get the propositions data from Supabase:
  const { data: ideas } = await supabase
    .from("proposals")
    .select("*")
    .eq("story_id", story.id)
    .order("created_at", { ascending: true });

  //Promise.all to get the usernames of the collaborators:
  const users = await Promise.all(
    story.collaborators.map(async (collaboratorId) => {
      //Fetch the usernames from Supabase:
      const { data: user, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", collaboratorId)
        .single();
      //If there is an error or no user, return null:
      if (error || !user) {
        console.error(
          "Erreur de récupération utilisateur pour:",
          collaboratorId,
          error
        );
        return null;
      }

      return user.username; //Return the usernames
    })
  );

  const collaboratorsNames = users.filter((name) => name !== null); //Filter out null values

  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <H1 content={story.title} />
        <p>
          <span className={styles.subtitle}>Collaborateurs:</span>{" "}
          <span className={styles.collaboratorsNames}>
            {collaboratorsNames.join(", ")}
          </span>
        </p>
        <div className={styles.storyContainer}>
          {story.story.map((text) => (
            <p className={styles.text} key={text}>
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.proposalsContainer}>
        <div className={styles.proposalsTitle}>Consulter les propositions</div>
        <div className={styles.ideasContainer}>
          {ideas.map((idea) => (
            <Propositions
              idea={idea}
              key={idea.id}
              storySlug={storiesSlug}
              votingDurationMinutes={story.voting_duration_minutes}
              storyUpdatedAt={story.latest_update_time}
            />
          ))}
        </div>
        <form
          action={createNewProposalAction}
          className={styles.propositionForm}
        >
          <label htmlFor="proposal" className={styles.formTitle}>
            Proposez votre idée:
          </label>
          <textarea
            type="text"
            id="proposal"
            name="proposal"
            className={styles.textInput}
            maxLength="500"
            placeholder="Écrivez votre idée..."
            required
          />
          <input type="hidden" id="storyId" name="storyId" value={story.id} />
          <input
            type="hidden"
            id="storySlug"
            name="storySlug"
            value={storiesSlug}
          />
          <Button content={"Envoyer"} />
        </form>
      </div>
    </div>
  );
};

export default ReadStoryPage;
