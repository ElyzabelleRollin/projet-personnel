//Imports:
import { createBrowserClient } from "@supabase/ssr";

//Function to create a Supabase client:
export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, //Get the Supabase URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY //Get the Supabase anon key
  );
};
