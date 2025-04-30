"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

export const EndVoteAction = async () => {
  console.log("endvote");
  const supabase = await createClient();
  // Fetch the data of the stories that need to end votes
  const { data: storiesToUpdate, error: fetchError } = await supabase
    .from("stories")
    .select("*")
    .lt("action_trigger_time", new Date().toISOString())
    .is("is_completed", false);

  //If there's no stories to update, exit:
  if (!storiesToUpdate || storiesToUpdate.length === 0) {
    return console.log("No stories to update");
  }
  console.log(storiesToUpdate);

  // For each story to update:
  for (const story of storiesToUpdate) {
    // Fetch all proposals in decreasing order by likes:
    const { data: proposals, error: proposalsError } = await supabase
      .from("proposals")
      .select("*")
      .eq("story_id", story.id)
      .order("likes", { ascending: false });
    console.log("[PROPOSALS]");

    if (proposalsError || !proposals || proposals.length === 0) {
      if (proposalsError) {
        console.error(
          `Error fetching proposals for story ID ${story.id}:`,
          proposalsError
        );
      }
      continue; // Skip if no proposals or an error occurred
    }
    console.log("[AFTER PROPOSALS]");

    // Add the chosen proposal's text to the story and ensure no duplicate collaborators:
    const updatedStoryText = Array.isArray(story.story) //Check if story.story is an array
      ? [...story.story, proposals[0].text] //If it is, adds the new proposal to the array and assures uniqueness
      : [proposals[0].text]; //If not, creates a new array with the new text
    const updatedCollaborators = Array.isArray(story.collaborators) //Check if story.collaborators is an array
      ? [...new Set([...story.collaborators, proposals[0].author])] //If it is, adds the new collaborator to the array and assures uniqueness
      : [proposals[0].author]; //If not, creates a new array with the new collaborator
    const isCompleted = updatedStoryText.length >= story.max_parts; // Check if story is completed

    // Update the story with the new values:
    const { error: updateError } = await supabase
      .from("stories")
      .update({
        story: updatedStoryText,
        collaborators: updatedCollaborators,
        latest_update_time: new Date().toISOString(),
        action_trigger_time: isCompleted
          ? null
          : new Date(
              Date.now() + story.voting_duration_minutes * 60 * 1000
            ).toISOString(),
        is_completed: isCompleted,
      })
      .eq("id", story.id);

    if (updateError) {
      console.error(`Error updating story with ID ${story.id}:`, updateError);
      continue; // Skip to the next story
    }

    if (isCompleted) {
      try {
        await generateAndUploadAudio({
          text: updatedStoryText.join("\n"),
          storyId: story.id,
          voice: story.voice,
          instructions: story.tone_of_voice,
        });
      } catch (error) {
        console.error(
          `Error generating and uploading audio for story with ID ${story.id}:`,
          error
        );
      }
    }

    // Delete all proposals for the story:
    const { error: deleteError } = await supabase
      .from("proposals")
      .delete()
      .eq("story_id", story.id);

    if (deleteError) {
      console.error(
        `Error deleting proposals for story with ID ${story.id}:`,
        deleteError
      );
    }
  }
  revalidatePath(`/stories/${storySlug}/read`);
};
