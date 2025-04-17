import React from "react";
import { createClient } from "@/app/_lib/supabase/server";

const Helpastory = async () => {
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("is_completed", false);
  return (
    <div>
      <h1>Aider une histoire</h1>
      <div>
        {stories.map((story) => (
          <div key={story.slug}>
            <img src="https://placehold.co/200x300" alt="background" />
            <p>{story.title}</p>
            <a href={`/stories/${story.slug}/read`}>Lire l'histoire</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Helpastory;
