"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createStoryAction = async (formData) => {
  const title = formData.get("title");
  const firstSentence = formData.get("firstSentence");
  const suggestionsLimit = formData.get("suggestionsLimit");
  const partiesLimit = formData.get("partiesLimit");
  const votingTimeLimit = formData.get("votingTimeLimit");
  const story = [ firstSentence ];

  //TODO
  //Éviter des champs vides avec ZOD

  const supabase = await createClient();

  const { data: newStory, error: newStoryError } = await supabase
    .from("stories")
    .upsert({
      title: title,
      story: story,
      suggestions_limit: suggestionsLimit,
      max_parts: partiesLimit,
      voting_duration_minutes: votingTimeLimit,
    })
    .select()
    .single();
    if(newStoryError) console.log(newStoryError);
  redirect(`/stories/${newStory.slug}/read`);
};
