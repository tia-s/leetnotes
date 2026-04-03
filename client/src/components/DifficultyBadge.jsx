import styles from './DifficultyBadge.module.css';

export default function DifficultyBadge({ difficulty }) {
  return (
    <span className={`${styles.badge} ${styles[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
}
