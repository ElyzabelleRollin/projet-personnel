"use client";
import React from "react";
import styles from "@/app/_components/global/button.module.css";
import { useFormStatus } from "react-dom";

const Button = ({ content, onClickAction }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={styles.submitButton}
      onClick={onClickAction ?? null}
      disabled={pending}
    >
      {content}
    </button>
  );
};

export default Button;
