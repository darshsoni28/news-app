import { Toolbar } from "../components/toolbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Toolbar />
      <title>News App</title>
      <div className={styles.main}>
        <h1>News App Home-Page</h1>
        <p>Click on the feed to get latest updates.</p>
      </div>
    </div>
  );
}
