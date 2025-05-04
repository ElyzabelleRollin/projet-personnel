//Imports:
import { oauthSigninAction } from "@/app/_actions/auth";
import React from "react";
import Button from "../global/button";
import styles from "@/app/_components/global/login.module.css";

//Login form:
const loginform = ({ redirectedFrom }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connectez-vous</h1>
      <form action={oauthSigninAction}>
        {redirectedFrom && (
          <input type="hidden" name="redirectedFrom" value={redirectedFrom} />
        )}
        <Button content={"Connexion avec Github"} />
      </form>
    </div>
  );
};

export default loginform;
