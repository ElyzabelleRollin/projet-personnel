import React from 'react'
import styles from "@/app/_components/stories/onprogessvignette.module.css"

const onprogressvignette = ({story}) => {
  return (
    <a href={`/stories/${story.slug}/read`}>
        <div className={styles.vignette}>
            <div className={styles.infosContainer}>
            <p className={styles.storyTitle}>{story.title}</p>
            <p><span className={styles.collaborateurs}>Collaborateurs:</span> {}</p>
            </div>
        </div>
    </a>
  )
}

export default onprogressvignette