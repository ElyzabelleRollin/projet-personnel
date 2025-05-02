//Imports:
"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

//Function to add a new proposal to a story:
export const createNewProposalAction = async (formData) => {
  const proposal = formData.get("proposal"); //Get the proposal from the form
  const storyId = formData.get("storyId"); //Get the story id from the form
  const storySlug = formData.get("storySlug"); //Get the story slug from the form
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Add the proposal to Supabase:
  const { data: newProposal, error: newProposalError } = await supabase
    .from("proposals")
    .insert({
      text: proposal,
      story_id: storyId,
    })
    .select();
  if (newProposalError) {
    console.log("[Proposal creation failed]", newProposalError);
  }

  //Adds in the user profile the count of suggestions:
  const { data: userInfos, error: ErrorGetUserInfos } = await supabase
    .from("users")
    .select("proposals_request_number")
    .eq("id", userConnected.id)
    .single();
  if (ErrorGetUserInfos) {
    console.log("[Get user infos failed]", ErrorGetUserInfos);
  }
  console.log(userInfos.proposals_request_number);

  //Updates the suggestions count:
  const { data: updatedUserInfos, error: errorUpdateUserInfos } = await supabase
    .from("users")
    .update({
      proposals_request_number: userInfos.proposals_request_number + 1,
    })
    .eq("id", userConnected.id)
    .single();

  if (errorUpdateUserInfos) {
    console.log("[Update user infos failed]", errorUpdateUserInfos);
  }
  revalidatePath(`/stories/${storySlug}/read`); //Revalidate the page
};

//Function to add a like to a proposal:
export const addLikeAction = async (formData) => {
  const proposalId = formData.get("proposalId"); //Get the proposal id from the form
  const storySlug = formData.get("storySlug"); //Get the story slug from the form
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Check if the user has already liked the proposal:
  const { data: like, error: likeError } = await supabase
    .from("liked_proposals")
    .select("*")
    .eq("proposal_id", proposalId)
    .eq("user_id", userConnected.id)
    .single();
  if (likeError) {
    console.log("[Like proposal check failed]", likeError);
  }
  if (like)
    //If the user has already liked the proposal, remove the like:
    removeLikeAction(formData);
  else {
    //If the user has not liked the proposal, add a like:
    const { data: newLike, error: newLikeError } = await supabase
      .from("liked_proposals")
      .insert({
        user_id: userConnected.id,
        proposal_id: proposalId,
      });
    if (newLikeError) {
      console.log("[Like proposal creation failed]", newLikeError);
    }
  }

  revalidatePath(`/stories/${storySlug}/read`); //Revalidate the page
};

//Function to remove a like from a proposal:
export const removeLikeAction = async (formData) => {
  const proposalId = formData.get("proposalId"); //Get the proposal id from the form
  const supabase = await createClient(); //Access Supabase

  //Get the user connected:
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  //Remove the like from Supabase:
  const { data: deletedLike, error: deletedLikeError } = await supabase
    .from("liked_proposals")
    .delete()
    .eq("proposal_id", proposalId)
    .eq("user_id", userConnected.id)
    .single();
  if (deletedLikeError) {
    console.log("[Like proposal deletion failed]", deletedLikeError);
  }
};
