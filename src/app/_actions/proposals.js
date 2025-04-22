"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";
import { Irish_Grover } from "next/font/google";

export const createNewProposalAction = async (formData) => {
  const proposal = formData.get("proposal");
  const storyId = formData.get("storyId");
  const storySlug = formData.get("storySlug");

  const supabase = await createClient();

  //TODO
  //Éviter des champs vides avec ZOD
  //Éviter les doublons de propositions

  const { data: newProposal, error: newProposalError } = await supabase
    .from("proposals")
    .insert({
      text: proposal,
      story_id: storyId,
    })
    .select();

  revalidatePath(`/stories/${storySlug}/read`);
};

export const addLikeAction = async (formData) => {
  const proposalId = formData.get("proposalId");
  const storySlug = formData.get("storySlug");
  
  const supabase = await createClient();
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();
  
  //Check if the user has already liked the proposal
  const { data: like, error: likeError } = await supabase
  .from("liked_proposals")
  .select("*")
  .eq("proposal_id", proposalId)
  .eq("user_id", userConnected.id)
  .single();
  
  //If the user has already liked the proposal, remove the like
  if (like) {
    removeLikeAction(formData);
  } else {
    //If the user has not liked the proposal, add a like
    const { data: newLike, error: newLikeError } = await supabase
    .from("liked_proposals")
    .insert({
      user_id: userConnected.id,
      proposal_id: proposalId,
    });
  }
  
  revalidatePath(`/stories/${storySlug}/read`);
};

export const removeLikeAction = async (formData) => {
  const proposalId = formData.get("proposalId");

  const supabase = await createClient();
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  const { data: deletedLike, error: deletedLikeError } = await supabase
    .from("liked_proposals")
    .delete()
    .eq("proposal_id", proposalId)
    .eq("user_id", userConnected.id)
    .single();
    if(deletedLikeError) console.log(deletedLikeError);
};
