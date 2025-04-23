import React from 'react'
import styles from "@/app/_components/global/button.module.css"

const button = ({content}) => {
  return (
    <button type="submit" className={styles.submitButton}>
            {content}
          </button>
  )
}

export default button