//Imports:
"use server";
import OpenAI from "openai";
import { createClient } from "@/app/_lib/supabase/server";

//Function to create a new story image using OpenAI:
export const CreateStoryImage = async ({ text, storyId }) => {
  const openai = new OpenAI(); //Access OpenAI
  const supabase = await createClient(); //Access Supabase

  // 1. Generate image using OpenAI:
  const result = await openai.images.generate({
    model: "dall-e-3",
    prompt: text,
    n: 1,
    size: "1024x1024",
    response_format: "url",
  });

  const imageUrl = result.data[0].url; //Get the image url
  const response = await fetch(imageUrl); //Fetch the image
  const buffer = await response.arrayBuffer(); //Get the image buffer
  const fileData = new Uint8Array(buffer); //Convert the buffer to Uint8Array
  const fileName = `stories/${storyId}.png`; //Set the file name

  // 2. Upload the image to Supabase Storage:
  const { error: errorUpload } = await supabase.storage
    .from("images")
    .upload(fileName, fileData, {
      contentType: "image/png",
    });
  //If there is an error:
  if (errorUpload) {
    console.error("[UPLOAD IMAGE ERROR]", errorUpload);
  }

  // 3. Get the public URL:
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  const imagePublicUrl = publicUrlData.publicUrl; //Public URL

  // 4. Update the image URL in the database:
  const { error: dbError } = await supabase
    .from("stories")
    .update({ image_url: imagePublicUrl })
    .eq("id", storyId);
  if (dbError) {
    console.error("[ERROR UPDATING IMAGE URL IN DATABASE]", dbError);
  }

  return imagePublicUrl; //Return the public URL
};
