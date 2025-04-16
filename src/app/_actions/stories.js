"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createStoryAction = async (formData) => {
    const title = formData.get("title");

    const supabase = createClient();
  
    const { data: newStory, error: newStoryError } = await supabase
    .from("stories")
    .upsert({
        title: title,
      })
      .select()
    .single();
      redirect(`/stories/${newStory.slug}`);
  };