//Imports:
import { updateSession } from "./app/_lib/supabase/middleware";

//Function to update the session:
export async function middleware(request) {
  // Code to be executed for each request before the framework:
  return await updateSession(request);
}

//Middleware configuration:
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
