import React from 'react'
import styles from "@/app/_components/global/nav.module.css";
import { createClient } from "@/app/_lib/supabase/server";

const Navigation = async () => {
    const supabase = await createClient();
    const {
      data: { user: userConnected },
    } = await supabase.auth.getUser();
  return (
    <nav className={styles.nav}>
    <ul className={styles.list}>
      <li className={styles.link}>
        <a href="/stories/createnewstory">Créer une histoire</a>
      </li>
      <li className={styles.link}>
        <a href="/stories/">Lire les histoires</a>
      </li>
      <li className={styles.link}>
        <a href="/stories/helpastory">Aider une histoire</a>
      </li>
      <li className={styles.link}>
        <a href={`/profiles/${userConnected.id}/`}>Profile</a>
      </li>
      <li className={styles.link}>
        <a href="/auth/login">Connexion</a>
      </li>
    </ul>
  </nav>
  )
}

export default Navigation