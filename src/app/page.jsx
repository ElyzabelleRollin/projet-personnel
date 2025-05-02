import H1 from "./_components/global/h1";
import styles from "@/app/_components/global/homepage.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>
        Créez votre propre histoire et laissez-vous guider par l'inspiration de la communauté
        </h2>
        <div className={styles.imgContainer}>
          <img className={styles.img} src="/img/createStory.png" alt="" />
        </div>
      </div>
      <div className={styles.containerHow}>
        <h2 className={styles.titleHow}>Comment cela fonctionne-t-il ?</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <img className={styles.logo} src="/img/add.svg" alt="" />
            Créez
          </li>
          <li className={styles.listItem}>
            <img className={styles.logo} src="/img/quill.svg" alt="" />
            Proposez
          </li>
          <li className={styles.listItem}>
            <img className={styles.logo} src="/img/emptyHeart.svg" alt="" />
            Votez
          </li>
          <li className={styles.listItem}>
            <img className={styles.logo} src="/img/play.svg" alt="" />
            Écoutez
          </li>
        </ul>
      </div>
    </div>
  );
}
