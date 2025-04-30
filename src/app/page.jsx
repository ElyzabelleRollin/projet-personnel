import H1 from "./_components/global/h1";
import styles from "@/app/_components/global/homepage.module.css";

export default function Home() {
  return (
    <div>
      <H1 content={"La plume partagée"} />
      <p className={styles.description}>
        Cette application offre un espace pour partager des histoires et des
        idées. Les utilisateurs peuvent proposer des améliorations, voter sur
        celles-ci, et voir leurs récits transformés en podcasts immersifs
        générés par une IA.
      </p>
    </div>
  );
}
