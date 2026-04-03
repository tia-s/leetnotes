import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_SYSTEM_DESIGN_LIST } from '../graphql/queries';
import DifficultyBadge from '../components/DifficultyBadge';
import Tag from '../components/Tag';
import Loading from '../components/Loading';
import styles from './SystemDesignPage.module.css';

export default function SystemDesignPage() {
  const { data, loading } = useQuery(GET_SYSTEM_DESIGN_LIST);

  if (loading) return <Loading />;

  const questions = data?.systemDesignQuestions || [];

  return (
    <div className="fade-in">
      <h1 className={styles.heading}>System Design</h1>
      <p className={styles.subtitle}>
        Structured breakdowns of common system design interview questions
      </p>

      <div className={styles.list}>
        {questions.map((q) => (
          <Link to={`/system-design/${q.slug}`} key={q.slug} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.cardName}>{q.name}</span>
              <DifficultyBadge difficulty={q.difficulty.toLowerCase()} />
              <span className={styles.arrow}>›</span>
            </div>
            <div className={styles.tags}>
              {q.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
