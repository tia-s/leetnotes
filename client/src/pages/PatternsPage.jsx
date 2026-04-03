import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PATTERNS } from '../graphql/queries';
import Loading from '../components/Loading';
import styles from './PatternsPage.module.css';

export default function PatternsPage() {
  const { data, loading } = useQuery(GET_PATTERNS);

  if (loading) return <Loading />;

  const patterns = data?.patterns || [];

  return (
    <div className="fade-in">
      <h1 className={styles.heading}>Patterns & Algorithms</h1>
      <p className={styles.subtitle}>
        Core algorithmic techniques — how they work, when to use them, and where they show up
      </p>

      <div className={styles.list}>
        {patterns.map((pat) => (
          <Link to={`/patterns/${pat.slug}`} key={pat.slug} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{pat.icon}</span>
              <strong className={styles.cardName}>{pat.name}</strong>
              <code className={styles.cardComplexity}>{pat.timeComplexity}</code>
              <span className={styles.cardArrow}>›</span>
            </div>
            <p className={styles.cardTagline}>{pat.tagline}</p>
            {pat.problems.length > 0 && (
              <div className={styles.cardProblems}>
                <span className={styles.problemIcon}>📖</span>
                {pat.problems.map((prob) => (
                  <span key={prob.slug} className={styles.problemChip}>{prob.name}</span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
