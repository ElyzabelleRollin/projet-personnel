"use client";
import React from 'react'
import Button from "@/app/_components/global/button";
import { createStoryAction } from "@/app/_actions/stories";
import styles from "@/app/_components/stories/createnewstorypage.module.css";
import { useState } from "react";
const createnewstoryform = () => {
    const [selectedSuggestionsLimit, setSelectedSuggestionsLimit] = useState(null); 
    const [selectedMaxParts, setSelectedMaxParts] = useState(null); 
    const [selectedVotingTimeLimit, setSelectedVotingTimeLimit] = useState(null); 
  return (
    <form action={createStoryAction} className={styles.formCreateStory}>
    <div className={styles.inputContainer}>
    <label htmlFor="title" className={styles.label}>
      Titre
    </label>
    <input
    className={styles.textInput}
    required
      type="text"
      id="title"
      name="title"
      placeholder="Donnez un titre à votre histoire..."
    />
    </div>
    <div className={styles.inputContainer}>
    <label htmlFor="firstSentence" className={styles.label}>
    Commencez votre histoire
    </label>
    <textarea
    className={styles.textInput}
      type="text"
      id="firstSentence"
      name="firstSentence"
      placeholder="Rédigez le premier paragraphe de votre histoire..."
      required
    />
    </div>
    <div className={styles.inputContainer}>
      <legend className={styles.label}>
      Combien de suggestions souhaitez-vous autoriser par phrase ?
      </legend>
      <div className={styles.test}>
        <div className={` ${
                  selectedSuggestionsLimit === 3
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
        <input
        className={styles.radio}
          type="radio"
          id="suggestionsLimitOption1"
          name="suggestionsLimit"
          value={3}
          defaultChecked
          required
          onClick={() => setSelectedSuggestionsLimit(3)}
        />
        <label htmlFor="suggestionsLimitOption1" className={styles.number}>3</label>
        </div>
        <div className={` ${
                  selectedSuggestionsLimit === 5
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
        <input
        className={styles.radio}
          type="radio"
          id="suggestionsLimitOption2"
          name="suggestionsLimit"
          value={5}
          required
          onClick={() => setSelectedSuggestionsLimit(5)}
        />
        <label className={styles.number} htmlFor="suggestionsLimitOption2">5</label>
        </div>
            <div className={` ${
                  selectedSuggestionsLimit === 7
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
        <input
          type="radio"
          id="suggestionsLimitOption3"
          name="suggestionsLimit"
          value={7}
          className={styles.radio}
          required
          onClick={() => setSelectedSuggestionsLimit(7)}
        />
        <label className={styles.number} htmlFor="suggestionsLimitOption3">7</label>
            </div>
    </div>
      </div>
      <div className={styles.inputContainer}>
      <legend className={styles.label}>
        Nombre de parties par histoire:
      </legend>
        <div className={styles.test}>
            <div className={` ${
                  selectedMaxParts === 5
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
          <input  className={styles.radio}
        required type="radio" id="partiesLimitOption1" name="partiesLimit" value={5} 
          onClick={() => setSelectedMaxParts(5)}/>
          <label className={styles.number} htmlFor="partiesLimitOption1">5</label>
            </div>
                <div className={` ${
                  selectedMaxParts === 10
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
          <input  className={styles.radio}
        required type="radio" id="partiesLimitOption2" name="partiesLimit" value={10} onClick={() => setSelectedMaxParts(10)}/>
          <label className={styles.numbers} htmlFor="partiesLimitOption2">10</label>
                </div>
<div className={` ${
                  selectedMaxParts === 15
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
          <input  className={styles.radio}
        required type="radio" id="partiesLimitOption3" name="partiesLimit" value={15} onClick={() => setSelectedMaxParts(15)}/>
          <label className={styles.numbers} htmlFor="partiesLimitOption3">15</label>
</div>
        </div>
    </div>
    <div>
      
    </div>
    <div className={styles.inputContainer}>
      <legend className={styles.label}>Combien de temps pour voter:</legend>
      <div className={styles.test}>
        <div className={` ${
                  selectedVotingTimeLimit === 10
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
            <input
            className={styles.radio}
            required
            onClick={() => setSelectedVotingTimeLimit(10)}
            type="radio"
            id="votingTimeLimitOption1"
            name="votingTimeLimit"
            value={10}
            />
            <label className={styles.time}  htmlFor="votingTimeLimitOption1">10m</label>
        </div>
        <div className={` ${
                  selectedVotingTimeLimit === 24
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
            <input
            className={styles.radio}
            required
            onClick={() => setSelectedVotingTimeLimit(24)}
              type="radio"
              id="votingTimeLimitOption2"
              name="votingTimeLimit"
              value={24 * 60}
            />
            <label className={styles.hours} htmlFor="votingTimeLimitOption2">24h</label>
        </div>
        <div className={` ${
                  selectedVotingTimeLimit === 48
                    ? styles.optionSelected
                    : styles.option
                } transition-colors`}>
            <input
            className={styles.radio}
            required
            onClick={() => setSelectedVotingTimeLimit(48)}
              type="radio"
              id="votingTimeLimitOption3"
              name="votingTimeLimit"
              value={48 * 60}
            />
            <label className={styles.hours} htmlFor="votingTimeLimitOption3">48h</label>
        </div>
      </div>
    </div>
    <Button content={ "Créer votre histoire"}/>
  </form>
  )
}

export default createnewstoryform