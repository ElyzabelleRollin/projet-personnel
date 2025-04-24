"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";
import { redirect } from "next/navigation";

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

export const AcceptPropositionAction = async (formData) => {
  const chosenSuggestionText = formData.get("chosenSuggestionText");
  const suggestionAuthor = formData.get("suggestionAuthor");
  const storyId = formData.get("storyId");
  const supabase = await createClient();
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();
  //Déterminer à combien de phrase on est rendu:
  const { data: story, error: storyError } = await supabase
  .from("stories")
  .select("story, max_parts, collaborators, author")
  .eq("id", storyId)
  .single();
  if(storyError) console.log(storyError);

  //Ajouter la phrase au json de l'histoire
  var textList = new Array();
  story.story.map((text)=>{
    textList.push(text);
  })
  textList.push(chosenSuggestionText);
  
  //Ajouter les collaborateurs au json de l'histoire
  var collaboratorsList = new Array();
  if(story.collaborators != null){
    story.collaborators.map((collaborator)=>{
      collaboratorsList.push(collaborator);
    })
  }
  //si le collaborateur n'est pas dans l'auteur et n'est pas déjà dans la liste
  if(suggestionAuthor != story.author && !collaboratorsList.includes(suggestionAuthor)){
    collaboratorsList.push(suggestionAuthor);
  }

  //Insérer le nouveau json
  const { error } = await supabase
  .from("stories")
  .update({
    story: textList,
    latest_update_time: new Date().toISOString(),
    collaborators: collaboratorsList,
  })
  .eq("id", storyId);


  //Supprimer toutes les propositions existantes
  const { errorDelete } = await supabase
  .from("proposals")
  .delete()
  .eq("story_id", storyId);

  //Vérifier si l'histoire est terminée
  if (textList.length >= story.max_parts) {
    const { data, error } = await supabase
      .from("stories")
      .update({
        is_completed: true,
      })
      .eq("id", storyId);
  
    if (error) {
      console.error("Error updating story:", error);
    } else {
      console.log("Story marked as completed:", data);
    }
  }
  
  //Changer de page
  redirect(`/profiles/${userConnected.id}/`);
};


export const RefusePropositionAction = async (formData) => {
  const chosenSuggestionId = formData.get("chosenSuggestionId");
  const storySlug = formData.get("storySlug");

  const supabase = await createClient();
  const { data: deletedProposition, error: deletedPropositionError } = await supabase
    .from("proposals")
    .delete()
    .eq("id", chosenSuggestionId)
    .single();
    if(deletedPropositionError) console.log(deletedPropositionError);

  revalidatePath(`/stories/${storySlug}/edit`);
};
