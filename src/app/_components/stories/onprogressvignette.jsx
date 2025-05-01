// Imports:
"use client";
import styles from "@/app/_components/stories/onprogessvignette.module.css";
import React, { useRef, useState } from "react";

// Used to display the vignette of a story:
const OnProgressVignette = ({ story }) => {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false); // Used to know if the audio is playing

  // Function to play or pause the audio
  const handlePlayPause = () => {
    // If there is an audio element:
    if (audioRef.current) {
      // If the audio is playing:
      if (isPlaying) {
        audioRef.current.pause(); // It's paused
        console.log("Audio paused");
      } else {
        audioRef.current
          .play() // It's played
          .then(() => {
            console.log("Audio played");
          })
          .catch((err) => {
            console.error("Error playing audio :", err);
          });
      }
      setIsPlaying(!isPlaying); // Toggle between play and pause
    }
  };

  // Render logic based on whether the story is completed or not
  return story.is_completed ? (
    // If the story is completed, allow play/pause of audio on click
    <div onClick={handlePlayPause}>
      <audio ref={audioRef} src={story.audio_url} preload="none" />
      <div className={styles.vignette}>
        <img src={story.image_url} alt={story.title} className={styles.image} />
        <div className={styles.infosContainer}>
          <p className={styles.storyTitle}>{story.title}</p>
        </div>
      </div>
    </div>
  ) : (
    // If the story is not completed, link to the reading page
    <a href={`/stories/${story.slug}/read`}>
      <audio ref={audioRef} src={story.audio_url} preload="none" />
      <div className={styles.vignette}>
        <img src={story.image_url} alt={story.title} className={styles.image} />
        <div className={styles.infosContainer}>
          <p className={styles.storyTitle}>{story.title}</p>
        </div>
      </div>
    </a>
  );
};

export default OnProgressVignette;
