import React from 'react'
import styles from "@/app/_components/global/h1.module.css"

const h1 = ({content}) => {
  return (
    <h1 className={styles.title}>{content}</h1>
  )
}

export default h1