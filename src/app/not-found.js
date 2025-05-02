import styles from "@/app/_components/global/notfound.module.css";
import H1 from "@/app/_components/global/h1";

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.book}>
        <img src="/img/fullOpenBook.svg" alt="fullOpenBook" />
      </div>
      <div className={styles.textContainer}>
        <H1 content={"Erreur 404"} />
        <p>Nous n'avons pas trouvé la page que vous cherchez</p>
        <a className={styles.link} href="/">
          Revenir sur la page d'accueil
        </a>
      </div>
    </div>
  );
}
