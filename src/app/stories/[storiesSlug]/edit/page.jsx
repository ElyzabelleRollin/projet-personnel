import React from 'react'
import { createClient } from "@/app/_lib/supabase/server";
import { AcceptPropositionAction } from '@/app/_actions/proposals';
import { RefusePropositionAction } from '@/app/_actions/proposals';

const EditStoryPage = async ({ params }) => {
    const { storiesSlug } = await params;
    const supabase = await createClient();
    const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

    const { data: suggestions } = await supabase
    .from("proposals")
    .select("*")
    .eq("story_id", story.id)
    .order("likes", { ascending: false });

  return (
    <div>
        <h1>{story.title}</h1>
        <div>
            <p>Propositions:</p>
            {
                suggestions.map((suggestion)=>(
                    <div key={suggestion.id}>
                        <p>{suggestion.text}</p>
                        <p>{suggestion.author}</p>
                        <p>{suggestion.likes} {suggestion.likes > 0 ? "votes": "vote"}</p>
                    </div>
                ))
            }
        </div>
            <p>Voici l'opition gagnante:</p>
            <p>{suggestions[0].text}</p>
            <p>Voulez-vous conserver ce choix?</p>
        <form action={AcceptPropositionAction}>
            <input type="hidden" name="chosenSuggestionText" value={suggestions[0].text}/>
            <input type="hidden" name="storyId" value={story.id}/>
            <button>Oui</button>
        </form>
        <form action={RefusePropositionAction}>
            <input type="hidden" name="chosenSuggestionId" value={suggestions[0].id}/>
            <input type="hidden" name="storySlug" value={story.slug}/>
            <button>Non</button>
        </form>
    </div>
  )
}

export default EditStoryPage