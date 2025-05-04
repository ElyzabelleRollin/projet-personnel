"use client";
import React from "react";
import Button from "@/app/_components/global/button";
import { createStoryAction } from "@/app/_actions/stories";
import styles from "@/app/_components/stories/createnewstoryform.module.css";
import { useState } from "react";
const createnewstoryform = () => {
  const [selectedStoryType, setSelectedStoryType] = useState(null);
  const [selectedNarrativeType, setSelectedNarrativeType] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const audioAsh = React.useRef(null);
  const audioEcho = React.useRef(null);
  const audioFable = React.useRef(null);
  const audioSage = React.useRef(null);

  const playVoice = (voice) => {
    if (voice === "ash" && audioAsh.current) {
      audioFable.current.pause();
      audioSage.current.pause();
      audioEcho.current.pause();
      audioAsh.current.play();
    }
    if (voice === "echo" && audioEcho.current) {
      audioFable.current.pause();
      audioSage.current.pause();
      audioAsh.current.pause();
      audioEcho.current.play();
    }
    if (voice === "fable" && audioFable.current) {
      audioSage.current.pause();
      audioAsh.current.pause();
      audioEcho.current.pause();
      audioFable.current.play();
    }
    if (voice === "sage" && audioSage.current) {
      audioFable.current.pause();
      audioAsh.current.pause();
      audioEcho.current.pause();
      audioSage.current.play();
    }
  };

  return (
    <form action={createStoryAction} className={styles.formCreateStory}>
      <div className={loading ? styles.loader : styles.loaderHidden}></div>
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
          maxLength="30"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="firstParagraph" className={styles.label}>
          Démarrez votre histoire
        </label>
        <textarea
          className={styles.textInput}
          type="text"
          id="firstParagraph"
          name="firstParagraph"
          placeholder="Rédigez le premier paragraphe de votre histoire..."
          maxLength="500"
          required
        />
      </div>
      <div className={styles.inputContainer}>
        <legend className={styles.label}>Type d'histoire:</legend>
        <div className={styles.test}>
          <div
            className={` ${
              selectedStoryType === "shortStory"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="shortStory"
              name="typeOfStory"
              value={"shortStory"}
              onClick={() => setSelectedStoryType("shortStory")}
            />
            <label htmlFor="shortStory" className={styles.text}>
              Histoire courte
            </label>
          </div>
          <div
            className={` ${
              selectedStoryType === "longStory"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="longStory"
              name="typeOfStory"
              value={"longStory"}
              onClick={() => setSelectedStoryType("longStory")}
            />
            <label htmlFor="longStory" className={styles.text}>
              Histoire longue
            </label>
          </div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <legend className={styles.label}>Type de récit:</legend>
        <div className={styles.test}>
          <div
            className={` ${
              selectedNarrativeType === "adventure"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="adventure"
              name="narrativeType"
              value={"adventure"}
              onClick={() => setSelectedNarrativeType("adventure")}
            />
            <label htmlFor="adventure" className={styles.text}>
              Aventure
            </label>
          </div>
          <div
            className={` ${
              selectedNarrativeType === "crime"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="crime"
              name="narrativeType"
              value={"crime"}
              onClick={() => setSelectedNarrativeType("crime")}
            />
            <label htmlFor="crime" className={styles.text}>
              Policier
            </label>
          </div>
          <div
            className={` ${
              selectedNarrativeType === "fantasy"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="fantasy"
              name="narrativeType"
              value={"fantasy"}
              onClick={() => setSelectedNarrativeType("fantasy")}
            />
            <label htmlFor="fantasy" className={styles.text}>
              Fantastique
            </label>
          </div>
          <div
            className={` ${
              selectedNarrativeType === "scienceFiction"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="scienceFiction"
              name="narrativeType"
              value={"scienceFiction"}
              onClick={() => setSelectedNarrativeType("scienceFiction")}
            />
            <label htmlFor="scienceFiction" className={styles.text}>
              Sci-fi
            </label>
          </div>
          <div
            className={` ${
              selectedNarrativeType === "psychological"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="psychological"
              name="narrativeType"
              value={"psychological"}
              onClick={() => setSelectedNarrativeType("psychological")}
            />
            <label htmlFor="psychological" className={styles.text}>
              Psychologique
            </label>
          </div>
          <div
            className={` ${
              selectedNarrativeType === "romance"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="romance"
              name="narrativeType"
              value={"romance"}
              onClick={() => setSelectedNarrativeType("romance")}
            />
            <label htmlFor="romance" className={styles.text}>
              Amour
            </label>
          </div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <legend className={styles.label}>Type de voix:</legend>
        <div className={styles.test}>
          <div
            className={` ${
              selectedVoice === "ash"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="ash"
              name="voiceType"
              value={"ash"}
              onClick={() => {
                setSelectedVoice("ash");
                playVoice("ash");
              }}
            />
            <audio
              ref={audioAsh}
              src="https://linprrxiphmpxxiwvstv.supabase.co/storage/v1/object/public/audios/ai/ash.wav"
              preload="none"
            />
            <label htmlFor="ash" className={styles.text}>
              Ash
            </label>
          </div>
          <div
            className={` ${
              selectedVoice === "echo"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="echo"
              name="voiceType"
              value={"echo"}
              onClick={() => {
                setSelectedVoice("echo");
                playVoice("echo");
              }}
            />
            <audio
              ref={audioEcho}
              src="https://linprrxiphmpxxiwvstv.supabase.co/storage/v1/object/public/audios/ai/echo.wav"
              preload="none"
            />
            <label htmlFor="echo" className={styles.text}>
              Echo
            </label>
          </div>
          <div
            className={` ${
              selectedVoice === "fable"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="fable"
              name="voiceType"
              value={"fable"}
              onClick={() => {
                setSelectedVoice("fable");
                playVoice("fable");
              }}
            />
            <audio
              ref={audioFable}
              src="https://linprrxiphmpxxiwvstv.supabase.co/storage/v1/object/public/audios/ai/fable.wav"
              preload="none"
            />
            <label htmlFor="fable" className={styles.text}>
              Fable
            </label>
          </div>
          <div
            className={` ${
              selectedVoice === "sage"
                ? styles.optionTextSelected
                : styles.optionText
            } transition-colors`}
          >
            <input
              className={styles.radio}
              required
              type="radio"
              id="sage"
              name="voiceType"
              value={"sage"}
              onClick={() => {
                setSelectedVoice("sage");
                playVoice("sage");
              }}
            />
            <audio
              ref={audioSage}
              src="https://linprrxiphmpxxiwvstv.supabase.co/storage/v1/object/public/audios/ai/sage.wav"
              preload="none"
            />
            <label htmlFor="sage" className={styles.text}>
              Sage
            </label>
          </div>
        </div>
      </div>
      <Button
        content={"Créer votre histoire"}
        onClickAction={() => setLoading(true)}
      />
    </form>
  );
};

export default createnewstoryform;
