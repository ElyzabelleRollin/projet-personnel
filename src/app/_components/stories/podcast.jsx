//Imports:
import styles from "@/app/_components/stories/readstories.module.css";
import H1 from "@/app/_components/global/h1";

//Podcast component:
const podcastComponent = ({ story }) => {
  return (
    <div className={styles.container}>
      <div className={styles.storyInfos}>
        <H1 content={story.title} />
        <p>
          <span className={styles.subtitle}>Collaborateurs:</span>{" "}
          <span className={styles.collaboratorsNames}>
            {story.author} {story.collaborators}
          </span>
        </p>
        <div className={styles.storyContainer}>
          {story.story.map((text, index) => (
            <div key={index} className={styles.storySegment}>
              <p className={styles.text}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default podcastComponent;
