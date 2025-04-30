import React from "react";
import H1 from "@/app/_components/global/h1";
import styles from "@/app/_components/global/titlecontainer.module.css";
const titlecontainer = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <H1 content={title} isTitleContained={true} />
    </div>
  );
};

export default titlecontainer;
