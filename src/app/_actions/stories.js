//Imports:
"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";
import { CreateStoryImage } from "./create";

//Function to create a new story:
export const createStoryAction = async (formData) => {
  const title = formData.get("title"); //Get the title from the form
  const firstParagraph = formData.get("firstParagraph"); //Get the first paragraph from the form
  const partiesLimit = formData.get("partiesLimit"); //Get the number of parts from the form
  const votingTimeLimit = formData.get("votingTimeLimit"); //Get the voting time limit from the form
  const story = [firstParagraph]; //Create an array with the first paragraph
  const supabase = await createClient(); //Access Supabase

  //TODO
  //Éviter des champs vides avec ZOD

  //Get user info:
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //Send the story data to Supabase:
  const { data: newStory, error: newStoryError } = await supabase
    .from("stories")
    .upsert({
      title: title,
      story: story,
      collaborators: [user.id],
      max_parts: partiesLimit,
      voting_duration_minutes: votingTimeLimit,
      action_trigger_time: new Date(
        Date.now() + votingTimeLimit * 60 * 1000
      ).toISOString(), //Set the action trigger time to know when to end the voting
    })
    .select()
    .single();
  if (newStoryError) console.log("[CREATE STORY ERROR]", newStoryError); //If there is an error

  CreateStoryImage({ text: firstParagraph, storyId: newStory.id }); //Create the story image
  redirect(`/stories/${newStory.slug}/read`); //Redirect to the story page
};
