"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

export const createNewProposalAction = async (formData) => {
  const proposal = formData.get("proposal");
  const storyId = formData.get("storyId");
  const storySlug = formData.get("storySlug");

  const supabase = await createClient();

  const { data: newProposal, error: newProposalError } = await supabase
    .from("proposals")
    .insert({
      text: proposal,
      story_id: storyId,
    })
    .select();
    
    revalidatePath(`/stories/${storySlug}/read`);
};
