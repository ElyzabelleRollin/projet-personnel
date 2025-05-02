//Imports:
"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

//Function to get the site URL:
const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? `http://localhost:3000/`; //Get the site URL
  url = url.startsWith("http") ? url : `https://${url}`; //Check if the URL starts with 'http'
  url = url.endsWith("/") ? url : `${url}/`; //Check if the URL ends with '/'
  return url; //Return the URL
};

//Function to sign in with GitHub:
export const oauthSigninAction = async () => {
  const supabase = await createClient(); //Access Supabase

  const headersAsync = await headers(); //Get the headers
  const origin = headersAsync.get("origin"); //Get the origin

  //Redirection to GitHub for the authentification:
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${getURL()}auth/callback`, //Set the redirect URL to the callback
    },
  });
  if (error) console.log("[AUTH LOGIN ERROR]", error);
  else {
    console.log("[SUCCESSFUL]", data.url);
    return redirect(data.url); //Redirect to GitHub
  }
};

//Function to logout:
export const logout = async () => {
  const supabase = await createClient(); //Access Supabase
  const { error } = await supabase.auth.signOut(); //Logout

  if (error) {
    console.log("[AUTH LOGOUT ERROR]", error);
  }
  return redirect("/auth/login"); //Redirect to the login page
};
