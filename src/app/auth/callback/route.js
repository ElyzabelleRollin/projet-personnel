//Imports:
import { createClient } from "@/app/_lib/supabase/server";
import { NextResponse } from "next/server";

//Fonction GET:
export async function GET(request) {
  const requestUrl = new URL(request.url); //Get the request url
  const code = requestUrl.searchParams.get("code"); //Get the code

  //If there is a code, exchange it for a session:
  if (code) {
    const supabase = await createClient(); //Access Supabase
    await supabase.auth.exchangeCodeForSession(code); //Exchange the code for a session
  }

  return NextResponse.redirect(requestUrl.origin); //Redirect to the homepage
}
