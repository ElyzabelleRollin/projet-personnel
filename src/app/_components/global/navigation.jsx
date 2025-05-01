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
          <a href="/">
          <img
            className={styles.illustration}
            src="/img/quillColored.svg"
            alt="quillColered"
            />
            Accueil
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
              <button>Déconnexion</button>
            </form>
          </div>
        ) : (
          <li className={styles.userLink}>
            <a href="/auth/login">
              <svg
                className={styles.login}
                xmlns="http://www.w3.org/2000/svg"
                width="224.95"
                height="281.63"
                viewBox="0 0 224.95 281.63"
              >
                <g>
                  <path
                    style={{ fill: "#654c8e" }}
                    d="M.05,281.63S-6.08,118.47,114.44,120.51s110.3,161.12,110.3,161.12H.05Z"
                  />
                  <circle
                    style={{ fill: "#654c8e" }}
                    cx="112.47"
                    cy="55.15"
                    r="55.15"
                  />
                </g>
              </svg>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
