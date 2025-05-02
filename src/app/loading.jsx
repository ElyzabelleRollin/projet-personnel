import styles from "@/app/_components/global/notfound.module.css";
import H1 from "@/app/_components/global/h1";

const loading = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.book}>
        <img src="/img/fullOpenBook.svg" alt="fullOpenBook" />
      </div>
      <div className={styles.textContainer}>
        <H1 content={"En chargement..."} />
        <p>Soyez patient, la créativité prend du temps</p>
      </div>
    </div>
  );
};

export default loading;
