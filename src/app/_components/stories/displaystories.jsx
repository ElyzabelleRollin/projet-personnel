//Imports:
"use client";
import ProfileStoryVignette from "@/app/_components/stories/profilestoryvignette";
import styles from "@/app/_components/stories/profilestoryvignette.module.css";
import { useState } from "react";

//Component to display the stories:
const DisplayStories = ({ stories, likedStories }) => {
  const [content, setContent] = useState("ongoing"); //State to manage the content

  return (
    <div className={styles.sectionContainer}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <button
              onClick={() => setContent("ongoing")} //Set the content to "ongoing"
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
              onClick={() => setContent("completed")} //Set the content to "completed"
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
              onClick={() => setContent("favorite")} //Set the content to "favorite"
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
      {/* Show the uncompleted stories */}
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
      {/* Show the completed stories */}
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
      {/* Show the favorite stories of the user */}
      {content === "favorite" && (
        <div className={styles.myStoriesContainer}>
          <div className={styles.vignettesContainer}>
            {likedStories.map((likedStory) => (
              <div key={likedStory.stories.id}>
                <ProfileStoryVignette
                  story={likedStory.stories}
                  typeNeeded="favorite"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayStories;
