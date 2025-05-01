import OpenAI from "openai";
import { createClient } from "@/app/_lib/supabase/server";

export async function generateAndUploadAudio ({ text, storyId, voice, instructions }){
  console.log("[FUNCTION GENERATE AUDIO]");
  const fileName = `${storyId}.mp3`;
  const openai = new OpenAI();
  const supabase = await createClient();

    console.log("[TEXT]", text);
    console.log("[STORY ID]", storyId);
    console.log("[VOICE]", voice);
    console.log("[INSTRUCTIONS]", instructions);

  // 1. Generate MP3 using OpenAI
  const mp3 = await openai.audio.speech.create({
    model: 'gpt-4o-mini-tts',
    voice: voice,
    text,
    // instructions,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());

  // 2. Upload to Supabase Storage
  const { error: errorUpload } = await supabase.storage
    .from("audios")
    .upload(fileName, buffer, {
      contentType: "audio/mpeg",
    });

  if (errorUpload) {
    console.error("Upload error:", errorUpload);
    throw new Error("Failed to upload audio.");
  }

  // 3. Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from("audios")
    .getPublicUrl(fileName);

  const url = publicUrlData.publicUrl;

  // 4. Save URL in your `stories` table
  const { error } = await supabase
    .from("stories")
    .update({ audio_url: url })
    .eq("id", storyId);

  if (error) {
    console.error("Supabase DB error:", error);
    throw new Error("Failed to save audio URL.");
  }
  return url;
};
