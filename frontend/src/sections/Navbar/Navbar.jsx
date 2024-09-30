import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav>
      <div className={styles.navbar}>
        <a href="/" className={`${styles.currentPage} ${styles.navbarItem}`}>
          Home
        </a>
        <a href="/works" className={styles.navbarItem}>
          Works
        </a>
        <div className={styles.navbarHeadContainer}>
          <img src="/Kim_Cat_Small.png" alt="" className={styles.navbarHead} />
        </div>
        <a href="/blog" className={styles.navbarItem}>
          Blog
        </a>
        <a href="/contact" className={styles.navbarItem}>
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
