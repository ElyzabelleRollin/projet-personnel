import React from "react";
import styles from "./audioplayer.module.css";

const AudioPlayer = ({ imageUrl, audioUrl }) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt="" />
      <audio className={styles.audio} controls src={audioUrl}></audio>
    </div>
  );
};

export default AudioPlayer;
