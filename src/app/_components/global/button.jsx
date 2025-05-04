//Imports:
"use client";
import React from "react";
import styles from "@/app/_components/global/button.module.css";
import { useFormStatus } from "react-dom";

//Button component:
const Button = ({ content, onClickAction }) => {
  const { pending } = useFormStatus(); //Get the status of the form
  return (
    <button
      type="submit"
      className={styles.submitButton}
      onClick={onClickAction ?? null}
      disabled={pending} //Disable the button if the form is pending
    >
      {content}
    </button>
  );
};

export default Button;
