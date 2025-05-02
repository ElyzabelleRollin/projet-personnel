//Imports:
import OpenAI from "openai";
import { createClient } from "@/app/_lib/supabase/server";

//Function to generate and upload audio using OpenAI and Supabase:
export async function generateAndUploadAudio({
  text,
  storyId,
  voice,
  instructions,
}) {
  const fileName = `${storyId}.mp3`; //Set the file name
  const openai = new OpenAI(); //Access OpenAI
  const supabase = await createClient(); //Access Supabase

  //Generate MP3 using OpenAI:
  const mp3 = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts", //Set the model
    voice: voice, //Set the voice
    input: text, //Set the text
    instructions, //Set the instructions for the voice tone
  });

  const buffer = Buffer.from(await mp3.arrayBuffer()); //Convert the buffer to Uint8Array

  //Upload to Supabase Storage:
  const { error: errorUpload } = await supabase.storage
    .from("audios")
    .upload(fileName, buffer, {
      contentType: "audio/mpeg",
    });

  if (errorUpload) {
    console.error("[UPLOAD ERROR]", errorUpload); //If there is an error
  }

  //Get the public URL:
  const { data: publicUrlData, error: publicUrlError } = supabase.storage
    .from("audios")
    .getPublicUrl(fileName);
  if (publicUrlError) {
    console.error("[PUBLIC URL ERROR]", publicUrlError);
  }

  const url = publicUrlData.publicUrl; //Get the public URL

  //Save URL in stories table:
  const { error } = await supabase
    .from("stories")
    .update({ audio_url: url })
    .eq("id", storyId);
  if (error) {
    console.error("[UPDATE AUDIO URL ERROR]", error);
  }
  return url; //Return the URL
}
