//Imports:
"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";
import { CreateStoryImage } from "./create";

//Function to create a new story:
export const createStoryAction = async (formData) => {
  const title = formData.get("title"); //Get the title from the form
  const firstParagraph = formData.get("firstParagraph"); //Get the first paragraph from the form
  const typeOfStory = formData.get("typeOfStory"); 
  const narrativeType = formData.get("narrativeType"); 
  const voiceType = formData.get("voiceType"); 
  const votingTimeLimit = typeOfStory === "shortStory" ? 10 :
                          typeOfStory === "longStory" ? 48 * 60:
                          0; 
  const  partiesLimit = typeOfStory === "shortStory" ? 5 :
                          typeOfStory === "longStory" ? 10 :
                          0; 
  const story = [firstParagraph]; //Create an array with the first paragraph
  const supabase = await createClient(); //Access Supabase

  const toneOfVoicePrompt = narrativeType === "adventure" ? "Use an energetic and suspenseful tone, with rising excitement." :
                      narrativeType === "crime" ? "Use a calm, investigative tone with a hint of mystery.":
                      narrativeType === "fantasy" ? "Use a mystical and dramatic tone, like a tale from ancient times.":
                      narrativeType === "scienceFiction" ? "Use a futuristic and precise tone, with wonder and curiosity.":
                      narrativeType === "psychological" ? "Use a slow, introspective tone with emotional depth.":
                      narrativeType === "romance" ? "Use a soft, warm, and emotional tone with tenderness.":
                      0; 

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
  if (newStoryError) console.log("[CREATE STORY ERROR]", newStoryError); //If there is an error
  try {
    await CreateStoryImage({ text: firstParagraph, storyId: newStory.id }); // Crée l'image
    redirect(`/stories/${newStory.slug}/read`); // Redirige ensuite
  } catch (error) {
    console.error("Erreur lors de la création de l'image :", error);
  }
};
