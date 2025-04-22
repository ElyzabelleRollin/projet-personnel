import React from 'react'
import { createClient } from "@/app/_lib/supabase/server";

const UserProfilePage = async () => {
    const supabase = await createClient();
    const {
      data: { user: userConnected },
    } = await supabase.auth.getUser();

    const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("author", userConnected.id);


    function CalculateDelais(story){
        const currentTime = Date.now();
        const creationTime = Date.parse(story.latest_update_time);
        const timeDifference = currentTime - creationTime;
        return timeDifference;
      }

  return (
    <div>
        <div>
            <h1>Nom</h1>
            <p>Membre depuis: </p>
        </div>
        <div>
            Histoires créées:
            {stories.map((story) => (
            <div key={story.slug}>
                <p>{story.title}</p>
                <p>{story.created_at.slice(0,10)}</p>
                {story.is_completed ? 
                <a href={`/stories/${story.slug}`}>Consulter</a>
                : <a href={`/stories/${story.slug}/read`}>Consulter</a>}
             {CalculateDelais(story) > story.voting_duration_minutes * 60 * 1000 && (
                 <a href={`/stories/${story.slug}/edit`}>Choisir la suite</a>
             )}
            </div>
          ))}
        </div>
    </div>
  )
}

export default UserProfilePage