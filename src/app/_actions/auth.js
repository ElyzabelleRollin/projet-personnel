"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const getURL = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? `http://localhost:3000/`;
  url = url.startsWith("http") ? url : `https://${url}`;
  // Assurer que l'URL se termine par '/'
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export const oauthSigninAction = async () => {
  const supabase = await createClient();

  // Afin que l'URL du site soit dynamique et facilement migrable vers un hébergeur
  const headersAsync = await headers();
  const origin = headersAsync.get("origin"); // Utilisation de "origin" si nécessaire

  // Demande de connexion via GitHub
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      // L'utilisateur sera redirigé après l'authentification
      redirectTo: `${getURL()}auth/callback`,
    },
  });

  if (error) {
    console.log("[AUTH LOGIN ERROR]", error);
  } else {
    console.log("[SUCCESSFUL]", data.url);
    // Redirection vers GitHub pour l'authentification
    return redirect(data.url);
  }
};

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("[AUTH LOGOUT ERROR]", error);
    throw new Error("Logout failed. Please try again.");
  }

  return redirect("/auth/login");
};
