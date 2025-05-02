"use client";
import ProfileStoryVignette from "@/app/_components/stories/profilestoryvignette";
import styles from "@/app/_components/stories/profilestoryvignette.module.css";
import { useState } from "react";

const DisplayStories = ({ stories, likedStories }) => {
  const [content, setContent] = useState("ongoing");

  return (
    <div className={styles.sectionContainer}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <button
              onClick={() => setContent("ongoing")}
              className={
                content === "ongoing"
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              Histoires en cours
            </button>
          </li>
          <li>
            <button
              onClick={() => setContent("completed")}
              className={
                content === "completed"
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              Histoires terminées
            </button>
          </li>
          <li>
            <button
              onClick={() => setContent("favorite")}
              className={
                content === "favorite"
                  ? styles.navButtonActive
                  : styles.navButton
              }
            >
              Histoires préférées
            </button>
          </li>
        </ul>
      </nav>

      {content === "ongoing" && (
        <div className={styles.myStoriesContainer}>
          <div className={styles.vignettesContainer}>
            {stories.map((story) => (
              <div key={story.id}>
                <ProfileStoryVignette story={story} typeNeeded={"ongoing"} />
              </div>
            ))}
          </div>
        </div>
      )}

      {content === "completed" && (
        <div className={styles.myStoriesContainer}>
          <div className={styles.vignettesContainer}>
            {stories.map((story) => (
              <div key={story.id}>
                <ProfileStoryVignette story={story} typeNeeded={"completed"} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {content === "favorite" && Array.isArray(likedStories) && (
        <div className={styles.myStoriesContainer}>
          <div className={styles.vignettesContainer}>
            {likedStories.map((story) => (
              <div key={story.id}>
                <ProfileStoryVignette story={story} typeNeeded="favorite" />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DisplayStories;
