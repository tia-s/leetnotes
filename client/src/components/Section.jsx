import styles from './Section.module.css';

export default function Section({ icon, title, children, variant = 'default' }) {
  return (
    <div className={`${styles.section} ${styles[variant]}`}>
      {title && (
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
