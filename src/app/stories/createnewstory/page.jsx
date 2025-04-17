import React from "react";
import { createStoryAction } from "@/app/_actions/stories";
import styles from "@/app/_components/stories/createnewstorypage.module.css";

const CreateNewStoryPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Créer une nouvelle histoire</h1>
      </div>
      <div className={styles.formContainer}>
      <form action={createStoryAction} className={styles.formCreateStory}>
        <label htmlFor="title">Nommer votre histoire</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Nommer votre histoire..."
        />
    <legend>Limite de suggestions par phrase:</legend>
    <div>
      <input type="radio" id="option1" name="suggestionsLimit" value={3} />
      <label for="contactChoice1">3</label>

      <input type="radio" id="option2" name="suggestionsLimit" value={5} />
      <label for="contactChoice2">5</label>

      <input type="radio" id="option3" name="suggestionsLimit" value={7} />
      <label for="contactChoice3">7</label>
    </div>
        <label htmlFor="firstSentence">Commencer votre histoire</label>
        <input
          type="text"
          id="firstSentence"
          name="firstSentence"
          placeholder="Écrivez votre première phrase..."
        />
        <button type="submit">Créer</button>
      </form>
      </div>
    </div>
  );
};

export default CreateNewStoryPage;
