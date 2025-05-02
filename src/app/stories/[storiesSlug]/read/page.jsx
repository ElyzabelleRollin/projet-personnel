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
            {[
              ...new Map(
                users.filter(Boolean).map((user) => [user.id, user])
              ).values(),
            ].map((user, index, arr) => (
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
          {story.story.map((text, i) => (
            <p className={styles.text} key={i}>
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.proposalsContainer}>
        <div className={styles.proposalsTitle}>
          Proposition en cours pour la partie {story.story.length + 1} de{" "}
          {story.max_parts}
        </div>
        <div className={styles.ideasContainer}>
          {ideas.length === 0 && (
            <div className={styles.noProposals}>
              Aucune proposition pour le moment
            </div>
          )}
          {ideas.map((idea) => (
            <Propositions idea={idea} key={idea.id} storySlug={storiesSlug} />
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
