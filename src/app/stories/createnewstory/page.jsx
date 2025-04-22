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
          <label htmlFor="title" className={styles.label}>
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Nommer votre histoire..."
            required
          />
          <label htmlFor="firstSentence" className={styles.label}>
            Commencer votre histoire
          </label>
          <textarea
            type="text"
            id="firstSentence"
            name="firstSentence"
            placeholder="Écrivez votre première phrase..."
            required
          />
          <legend className={styles.label}>
            Limite de suggestions par phrase:
          </legend>
          <div>
            <input
              type="radio"
              id="suggestionsLimitOption1"
              name="suggestionsLimit"
              value={3}
              defaultChecked
              required
            />
            <label htmlFor="suggestionsLimitOption1">3</label>

            <input
              type="radio"
              id="suggestionsLimitOption2"
              name="suggestionsLimit"
              value={5}
            />
            <label htmlFor="suggestionsLimitOption2">5</label>

            <input
              type="radio"
              id="suggestionsLimitOption3"
              name="suggestionsLimit"
              value={7}
            />
            <label htmlFor="suggestionsLimitOption3">7</label>
          </div>
          <legend className={styles.label}>
            Nombre de parties par histoire:
          </legend>
          <div>
            <input type="radio" id="partiesLimitOption1" name="partiesLimit" value={5} />
            <label htmlFor="partiesLimitOption1">5</label>

            <input type="radio" id="partiesLimitOption2" name="partiesLimit" value={10} />
            <label htmlFor="partiesLimitOption2">10</label>

            <input type="radio" id="partiesLimitOption3" name="partiesLimit" value={15} />
            <label htmlFor="partiesLimitOption3">15</label>
          </div>
          <legend className={styles.label}>Combien de temps pour voter:</legend>
          <div>
            <input
              type="radio"
              id="votingTimeLimitOption1"
              name="votingTimeLimit"
              value={10}
            />
            <label htmlFor="votingTimeLimitOption1">10 min</label>

            <input
              type="radio"
              id="votingTimeLimitOption2"
              name="votingTimeLimit"
              value={24 * 60}
            />
            <label htmlFor="votingTimeLimitOption2">24h</label>

            <input
              type="radio"
              id="votingTimeLimitOption3"
              name="votingTimeLimit"
              value={48 * 60}
            />
            <label htmlFor="votingTimeLimitOption3">48h</label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Créer votre histoire
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewStoryPage;
