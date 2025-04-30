import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import { AcceptPropositionAction } from "@/app/_actions/proposals";
import { RefusePropositionAction } from "@/app/_actions/proposals";
import TitleContainer from "@/app/_components/global/titlecontainer";
import styles from "@/app/_components/stories/editpage.module.css";
import Button from "@/app/_components/global/button";

const EditStoryPage = async ({ params }) => {
  const { storiesSlug } = await params;
  const supabase = await createClient();
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

  const { data: suggestions } = await supabase
    .from("proposals")
    .select("*")
    .eq("story_id", story.id)
    .order("likes", { ascending: false });

  return (
    <div className={styles.pageContainer}>
      <TitleContainer title={"Gérer l'histoire"} />
      {suggestions.length > 0 ? (
        <div className={styles.formContainer}>
          <p className={styles.question}>Voici l'opition gagnante:</p>
          <p className={styles.suggestion}>{suggestions[0].text}</p>
          <div className={styles.buttonContainer}>
            <form action={AcceptPropositionAction}>
              <input
                type="hidden"
                name="chosenSuggestionText"
                value={suggestions[0].text}
              />
              <input type="hidden" name="storyId" value={story.id} />
              <input
                type="hidden"
                name="suggestionAuthor"
                value={suggestions[0].author}
              />
              <Button content={"Accepter la proposition"} />
            </form>
            <form action={RefusePropositionAction}>
              <input
                type="hidden"
                name="chosenSuggestionId"
                value={suggestions[0].id}
              />
              <input type="hidden" name="storySlug" value={story.slug} />
              <Button content={"Passer à la suivante"} />
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1>null</h1>
        </div>
      )}
    </div>
  );
};

export default EditStoryPage;
