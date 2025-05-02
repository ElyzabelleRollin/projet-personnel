import React from "react";
import TitleContainer from "@/app/_components/global/titlecontainer";
import CreateNewStoryForm from "@/app/_components/stories/createnewstoryform";
import styles from "@/app/_components/stories/createnewstorypage.module.css";

const CreateNewStoryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <TitleContainer title={"Donnez vie à votre histoire"} />
      <div className={styles.formContainer}>
        <CreateNewStoryForm />
      </div>
    </div>
  );
};

export default CreateNewStoryPage;
