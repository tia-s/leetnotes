import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PROBLEMS } from '../graphql/queries';
import DifficultyBadge from '../components/DifficultyBadge';
import Loading from '../components/Loading';
import styles from './ProblemsPage.module.css';

export default function ProblemsPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const { data, loading } = useQuery(GET_PROBLEMS, {
    variables: {
      difficulty: difficulty || undefined,
      search: search || undefined,
    },
  });

  if (loading) return <Loading />;

  const problems = data?.problems || [];

  return (
    <div className="fade-in">
      <h1 className={styles.heading}>LeetCode Problems</h1>
      <p className={styles.subtitle}>
        From naive to optimal — documenting the thinking, not just the answer
      </p>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filters}>
        {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
          <button
            key={d}
            className={`${styles.filterBtn} ${
              (d === 'All' && !difficulty) || d.toLowerCase() === difficulty?.toLowerCase()
                ? styles.filterActive
                : ''
            }`}
            onClick={() => setDifficulty(d === 'All' ? null : d.toUpperCase())}
          >
            {d}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {problems.map((p) => (
          <Link to={`/problems/${p.slug}`} key={p.slug} className={styles.row}>
            <div className={styles.rowLeft}>
              <span className={styles.rowId}>{p.id}</span>
              <span className={styles.rowName}>{p.name}</span>
            </div>
            <div className={styles.rowRight}>
              <DifficultyBadge difficulty={p.difficulty.toLowerCase()} />
              <span className={styles.arrow}>›</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
