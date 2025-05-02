//Imports:
"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";
import { CreateStoryImage } from "./create";
import { revalidatePath } from "next/cache";

//Function to create a new story:
export const createStoryAction = async (formData) => {
  const title = formData.get("title"); //Get the title from the form
  const firstParagraph = formData.get("firstParagraph"); //Get the first paragraph from the form
  const typeOfStory = formData.get("typeOfStory"); //Get the type of story from the form
  const narrativeType = formData.get("narrativeType"); //Get the narrative type from the form
  const voiceType = formData.get("voiceType"); //Get the voice type from the form
  const story = [firstParagraph]; //Create an array with the first paragraph
  const supabase = await createClient(); //Access Supabase
  //Choose the time limit based on the type of story:
  const votingTimeLimit =
    typeOfStory === "shortStory"
      ? 10
      : typeOfStory === "longStory"
      ? 48 * 60
      : 0;
  //Choose the number of parties based on the type of story:
  const partiesLimit =
    typeOfStory === "shortStory" ? 5 : typeOfStory === "longStory" ? 10 : 0;
  //Choose the tone of voice based on the narrative type:
  const toneOfVoicePrompt =
    narrativeType === "adventure"
      ? "Use an energetic and suspenseful tone, with rising excitement."
      : narrativeType === "crime"
      ? "Use a calm, investigative tone with a hint of mystery."
      : narrativeType === "fantasy"
      ? "Use a mystical and dramatic tone, like a tale from ancient times."
      : narrativeType === "scienceFiction"
      ? "Use a futuristic and precise tone, with wonder and curiosity."
      : narrativeType === "psychological"
      ? "Use a slow, introspective tone with emotional depth."
      : narrativeType === "romance"
      ? "Use a soft, warm, and emotional tone with tenderness."
      : 0;

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
      voice: voiceType,
      tone_of_voice: toneOfVoicePrompt,
      voting_duration_minutes: votingTimeLimit,
      action_trigger_time: new Date(
        Date.now() + votingTimeLimit * 60 * 1000
      ).toISOString(), //Set the action trigger time to know when to end the voting
    })
    .select()
    .single();
  if (newStoryError) {
    console.log("[Story creation failed]", newStoryError);
  }
  try {
    await CreateStoryImage({ text: firstParagraph, storyId: newStory.id }); //Create the image with OpenAI
  } catch (error) {
    console.log("[Image creation failed]", error);
  }
  redirect(`/stories/${newStory.slug}/read`); //Redirect to the read page
};

//Function to like a story:
export const likeStoryAction = async (formData) => {
  const storyId = formData.get("storyId"); //Get the proposal id from the form
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Check if the user has already liked the story:
  const { data: like, error: likeStoryError } = await supabase
    .from("liked_stories")
    .select("*")
    .eq("story_id", storyId)
    .eq("user_id", userConnected.id)
    .single();
  if (likeStoryError) {
    console.log(likeStoryError);
  } //If there is an error, log an error

  //If the user has already liked the story, remove the like:
  if (like) removeLikeStoryAction(formData);
  else {
    //If the user has not liked the story, add a like:
    const { data: newLike, error: newLikeError } = await supabase
      .from("liked_stories")
      .insert({
        user_id: userConnected.id,
        story_id: storyId,
      });
    if (newLikeError) {
      console.log("[Like story failed]", newLikeError);
    } //If there is an error, log an error
  }
  revalidatePath(`/stories/`); //Revalidate the page
};

//Function to remove a like from a story:
export const removeLikeStoryAction = async (formData) => {
  const storyId = formData.get("storyId"); //Get the story id from the form
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Remove the like from Supabase:
  const { data: deletedLike, error: deletedLikeError } = await supabase
    .from("liked_stories")
    .delete()
    .eq("story_id", storyId)
    .eq("user_id", userConnected.id)
    .single();
  if (deletedLikeError) {
    console.log("[Like story deletion failed]", deletedLikeError);
  }
};
