//Imports:
import React from "react";
import styles from "@/app/_components/global/h1.module.css";

//H1 component:
const H1 = ({ content, isTitleContained }) => {
  return (
    <h1
      //Change the className depending on if the title is contained or not:
      {...(isTitleContained
        ? { className: styles.titleContained }
        : { className: styles.title })}
    >
      {content}
    </h1>
  );
};

export default H1;
