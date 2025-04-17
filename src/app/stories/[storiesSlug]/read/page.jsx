import React from "react";
import { createClient } from "@/app/_lib/supabase/server";

const ReadStoryPage = async ({ params }) => {
  const { storiesSlug } = params; //Get the slug of the quiz
  const supabase = createClient();
  const { data: story, storyError } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", storiesSlug)
    .single();

  const { data: ideas, ideasError } = await supabase
    .from("proposals")
    .select("*")
    .eq("story_id", story.id);

  return (
    <div>
      <div>
        <h1>{story.title}</h1>
        <p>{story.author}</p>
        <p>{story.created_at.slice(0, 10)}</p>
        <p>{story.story.firstSentence}</p>
      </div>
      <div className="flex">
        <div>
          {ideas.map((idea) => (
            <div key={idea.id}>
              <p>{idea.text}</p>
            </div>
          ))}
        </div>
        <form action="">
          <button>Envoi</button>
        </form>
      </div>
    </div>
  );
};

export default ReadStoryPage;
