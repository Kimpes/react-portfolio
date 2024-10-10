import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav>
      <div className={styles.navbar}>
        <a href="/" className={styles.navbarHeadContainer}>
          <img src="/Kim_Cat_Small.png" alt="" className={styles.navbarHead} />
        </a>
        <a href="/" className={`${styles.currentPage} ${styles.navbarItem}`}>
          Introduction
        </a>
        <a href="/" className={styles.navbarItem}>
          Portfolio
        </a>
        <a href="/" className={styles.navbarItem}>
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
