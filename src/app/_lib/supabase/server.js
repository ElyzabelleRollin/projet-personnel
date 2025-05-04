//Imports:
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

//Function to create a Supabase client:
export const createClient = async () => {
  const cookieStore = await cookies(); //Get the cookies

  //Create the Supabase client:
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, //Get the Supabase URL
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, //Get the Supabase anon key
    {
      cookies: {
        getAll() {
          return cookieStore.getAll(); //Return the cookies
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            ); //Set the cookies
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
