import React from "react";
import styles from "@/app/_components/global/h1.module.css";

const h1 = ({ content, isTitleContained }) => {
  return (
    <h1
      {...(isTitleContained
        ? { className: styles.titleContained }
        : { className: styles.title })}
    >
      {content}
    </h1>
  );
};

export default h1;
