import React from "react";
import TitleContainer from "@/app/_components/global/titlecontainer";
import CreateNewStoryForm from "@/app/_components/stories/createnewstoryform";
import styles from "@/app/_components/stories/createnewstorypage.module.css";
import { EndVoteAction } from "@/app/_actions/endvote";

const CreateNewStoryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <TitleContainer title={"Créez une histoire"} />
      <div className={styles.formContainer}>
        <CreateNewStoryForm />
      </div>
      <form action={EndVoteAction}>
        <button className="bg-amber-50">Update</button>
      </form>
    </div>
  );
};

export default CreateNewStoryPage;
