import { oauthSigninAction } from "@/app/_actions/auth";
import { logout } from "@/app/_actions/auth";
import React from "react";

const loginform = ({ redirectedFrom }) => {
  return (
    <section>
      <div>
        <h1>Login to your account</h1>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            
          />
          <button>Login with email</button>
        </form>
        <form action={oauthSigninAction}>
          {redirectedFrom && (
            <input type="hidden" name="redirectedFrom" value={redirectedFrom} />
          )}

          <button>
            <p>
              Sign in with Github
            </p>
          </button>
        </form>
        <form>
          <button>Don't have an account? Sign up</button>
        </form>
      </div>
      <form action={logout}>
      <button >Déconnexion</button>
      </form>
    </section>
  );
};

export default loginform;
