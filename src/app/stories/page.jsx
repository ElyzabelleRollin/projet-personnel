//Imports:
import React from "react";
import { createClient } from "../_lib/supabase/server";

//Page to display all the stories created
const StoriesPage = async () => {
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("is_completed", true);

  return (
    <div>
      <div>Lire les histoires</div>
      {/* Conteneur de toutes les histoires */}
      <div>
        {stories.map((story) => (
          <div key={story.slug}>
            <img src="https://placehold.co/200x300" alt="background" />
            <p>{story.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
