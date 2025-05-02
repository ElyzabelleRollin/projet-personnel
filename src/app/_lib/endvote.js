//Imports:
import { createClient } from "@/app/_lib/supabase/server";
import { generateAndUploadAudio } from "@/app/_actions/upload";

//Function to handle the end vote:
//Is called by the cron job to update the stories:
export async function runEndVote() {
  const supabase = await createClient(); //Access Supabase

  //Fetch stories to update:
  const { data: storiesToUpdate, error: fetchError } = await supabase
    .from("stories")
    .select("*")
    .lt("action_trigger_time", new Date().toISOString())
    .is("is_completed", false);

  if (!storiesToUpdate || storiesToUpdate.length === 0) {
    return console.log("[NO STORIES TO UPDATE]");
  }

  //For each story to update:
  for (const story of storiesToUpdate) {
    //Fetch proposals for the story:
    const { data: proposals, error: proposalsError } = await supabase
      .from("proposals")
      .select("*")
      .eq("story_id", story.id)
      .order("likes", { ascending: false });

    if (proposalsError || !proposals || proposals.length === 0) {
      if (proposalsError) {
        console.log("[THERE'S NO PROPOSALS FOR THE STORY]", proposalsError);
      }
      continue; //If there are no proposals, skip to the next story
    }

    //Construct the updated story:
    const updatedStoryText = Array.isArray(story.story)
      ? [...story.story, proposals[0].text]
      : [proposals[0].text];
    //Construct the updated collaborators:
    const updatedCollaborators = Array.isArray(story.collaborators)
      ? [...story.collaborators, proposals[0].author]
      : [proposals[0].author];
    //Check if the story is completed:
    const isCompleted = updatedStoryText.length >= story.max_parts;

    //Update the story:
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
      console.error(`[Error updating story with ID ${story.id}:]`, updateError); //If there is an error, log it
      continue; //If there is an error, skip to the next story
    }

    //Adds in the user profile the count of suggestions:
    const { data: userInfos, error: ErrorGetUserInfos } = await supabase
      .from("profiles")
      .select("accepted_proposals_number")
      .eq("id", proposals[0].author)
      .single();
    if (ErrorGetUserInfos) {
      console.log("[Get user infos failed]", ErrorGetUserInfos);
    }

    //Updates the suggestions count:
    const { data: updatedUserInfos, error: ErrorUpdateUserInfos } =
      await supabase.from("profiles").update({
        accepted_proposals_number: userInfos.accepted_proposals_number + 1,
      });
    if (ErrorUpdateUserInfos) {
      console.log("[Update user infos failed]", ErrorUpdateUserInfos);
    }

    //If the story is completed, generate and upload audio:
    if (isCompleted) {
      try {
        await generateAndUploadAudio({
          text: updatedStoryText.join("\n"),
          storyId: story.id,
          voice: story.voice,
          instructions: story.tone_of_voice,
        }); //Generate and upload audio
      } catch (error) {
        console.error("[Error generating and uploading audio]", error);
      }
    }

    //Delete proposals for the story:
    const { error: deleteError } = await supabase
      .from("proposals")
      .delete()
      .eq("story_id", story.id);

    if (deleteError) {
      console.error("[Error deleting proposals]", deleteError);
    }
  }
}
