//Imports:
import React from 'react'
import { createClient } from "../_lib/supabase/server";
import {DisplayStories} from "@/app/_components/stories/displaystories";

//Page to display all the stories created
const StoriesPage = async () => {
    const supabase = createClient();
    const { data: stories, error } = await supabase
    .from("stories")
    .select("*");

    return (
        <div>
            <div>StoriesPage</div>
            {/* Conteneur de toutes les histoires */}
            <div>
                {stories.map((story)=>(
                    <div key={story.slug}>
                            <img src="https://placehold.co/400x600" alt="background" />
                        <p>{story.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StoriesPage