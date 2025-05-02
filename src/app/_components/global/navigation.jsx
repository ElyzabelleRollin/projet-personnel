import React from "react";
import styles from "@/app/_components/global/nav.module.css";
import { createClient } from "@/app/_lib/supabase/server";
import { logout } from "@/app/_actions/auth";

const Navigation = async () => {
  const supabase = await createClient();
  const {
    data: { user: userConnected },
  } = await supabase.auth.getUser();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.link}>
          <a className={styles.title} href="/">
            {/* <img
              className={styles.illustration}
              src="/img/quillColored.svg"
              alt="quillColered"
            /> */}
            La plume partagée
          </a>
        </li>

        <li className={styles.link}>
          <a href="/stories/createnewstory">
            <img
              className={styles.illustration}
              src="/img/quill.svg"
              alt="quill"
            />
            Créer une histoire
          </a>
        </li>
        <li className={styles.link}>
          <a href="/stories/helpastory">
            <img
              className={styles.illustration}
              src="/img/helpLogo.svg"
              alt="helpLogo"
            />
            Aider une histoire
          </a>
        </li>
        <li className={styles.link}>
          <a href="/stories/">
            <img
              className={styles.illustration}
              src="/img/openBookLogo.svg"
              alt="openBookLogo"
            />
            Lire les histoires
          </a>
        </li>
        {userConnected ? (
          <div className={styles.userLink}>
            <li className={styles.link}>
              <a
                className={styles.avatarContainer}
                href={`/profiles/${userConnected.id}/`}
              >
                <img
                  className={styles.avatar}
                  src={userConnected.user_metadata.avatar_url}
                  alt={userConnected.user_metadata.user_name}
                />
              </a>
            </li>
            <form action={logout}>
              <button>
                <img
                  className={styles.illustration}
                  src="/img/logout.svg"
                  alt="logoutLogo"
                />
                Déconnexion
              </button>
            </form>
          </div>
        ) : (
          <li className={styles.userLink}>
            <a href="/auth/login">
              <img
                className={styles.illustration}
                src="/img/login.svg"
                alt="loginLogo"
              />
              Connexion
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
