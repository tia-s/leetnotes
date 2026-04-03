import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>📖</span>
          <span className={styles.logoText}>LeetNotes</span>
        </NavLink>
        <div className={styles.links}>
          <NavLink to="/problems" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            <span className={styles.linkIcon}>☰</span> Problems
          </NavLink>
          <NavLink to="/patterns" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            <span className={styles.linkIcon}>⊞</span> Patterns
          </NavLink>
          <NavLink to="/system-design" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            <span className={styles.linkIcon}>📐</span> System Design
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
