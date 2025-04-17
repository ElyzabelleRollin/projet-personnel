"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createStoryAction = async (formData) => {
  const title = formData.get("title");
  const firstSentence = formData.get("firstSentence");
  const story = { firstSentence };

  const supabase = createClient();

  const { data: newStory, error: newStoryError } = await supabase
    .from("stories")
    .upsert({
      title: title,
      story: story,
    })
    .select()
    .single();
  redirect(`/stories/${newStory.slug}`);
};
