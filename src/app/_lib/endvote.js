import { createClient } from "@/app/_lib/supabase/server";
import { generateAndUploadAudio } from "@/app/_actions/upload";

export async function runEndVote() {
  console.log("[END VOTE]");
  const supabase = await createClient();

  const { data: storiesToUpdate, error: fetchError } = await supabase
    .from("stories")
    .select("*")
    .lt("action_trigger_time", new Date().toISOString())
    .is("is_completed", false);

  if (!storiesToUpdate || storiesToUpdate.length === 0) {
    return console.log("No stories to update");
  }

  for (const story of storiesToUpdate) {
    const { data: proposals, error: proposalsError } = await supabase
      .from("proposals")
      .select("*")
      .eq("story_id", story.id)
      .order("likes", { ascending: false });

    if (proposalsError || !proposals || proposals.length === 0) {
      if (proposalsError) {
        console.error(
          `Error fetching proposals for story ID ${story.id}:`,
          proposalsError
        );
      }
      continue;
    }

    const updatedStoryText = Array.isArray(story.story)
      ? [...story.story, proposals[0].text]
      : [proposals[0].text];
    const updatedCollaborators = Array.isArray(story.collaborators)
      ? [...new Set([...story.collaborators, proposals[0].author])]
      : [proposals[0].author];
    const isCompleted = updatedStoryText.length >= story.max_parts;

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
      continue;
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
          `Error generating and uploading audio for story ${story.id}:`,
          error
        );
      }
    }

    const { error: deleteError } = await supabase
      .from("proposals")
      .delete()
      .eq("story_id", story.id);

    if (deleteError) {
      console.error(
        `Error deleting proposals for story ${story.id}:`,
        deleteError
      );
    }
  }
}
