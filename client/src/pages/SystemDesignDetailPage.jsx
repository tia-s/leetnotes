import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SYSTEM_DESIGN } from '../graphql/queries';
import DifficultyBadge from '../components/DifficultyBadge';
import Tag from '../components/Tag';
import Section from '../components/Section';
import Loading from '../components/Loading';
import styles from './SystemDesignDetailPage.module.css';

export default function SystemDesignDetailPage() {
  const { slug } = useParams();
  const { data, loading } = useQuery(GET_SYSTEM_DESIGN, { variables: { slug } });

  if (loading) return <Loading />;

  const q = data?.systemDesignQuestion;
  if (!q) return <div>Question not found</div>;

  return (
    <div className="fade-in">
      <div className={styles.header}>
        <h1 className={styles.title}>{q.name}</h1>
        <div className={styles.meta}>
          <DifficultyBadge difficulty={q.difficulty.toLowerCase()} />
          {q.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          {q.referenceUrl && (
            <a href={q.referenceUrl} target="_blank" rel="noopener noreferrer" className={styles.refLink}>
              Reference ↗
            </a>
          )}
        </div>
      </div>

      <Section icon="📋" title="Requirements">
        <div className={styles.reqGrid}>
          <div>
            <div className={styles.reqLabel}>FUNCTIONAL</div>
            {q.requirements.functional.map((r, i) => (
              <div key={i} className={styles.reqItem}>
                <span className={styles.reqCheck}>✓</span> {r}
              </div>
            ))}
          </div>
          <div>
            <div className={styles.reqLabelWarn}>NON-FUNCTIONAL</div>
            {q.requirements.nonFunctional.map((r, i) => (
              <div key={i} className={styles.reqItem}>
                <span className={styles.reqWarn}>⚠</span> {r}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section icon="🏗" title="High-Level Design">
        <p className={styles.hldOverview}>{q.highLevelDesign.overview}</p>
        <div className={styles.components}>
          {q.highLevelDesign.components.map((c, i) => (
            <div key={i} className={styles.component}>
              <code className={styles.componentName}>{c.name}</code>
              <span className={styles.componentSep}>—</span>
              <span className={styles.componentDesc}>{c.description}</span>
            </div>
          ))}
        </div>
      </Section>

      {q.deepDives.length > 0 && (
        <Section icon="🔍" title="Deep Dives">
          {q.deepDives.map((dd, i) => (
            <div key={i} className={styles.deepDive}>
              <strong className={styles.ddTitle}>{dd.title}</strong>
              <p className={styles.ddContent}>{dd.content}</p>
            </div>
          ))}
        </Section>
      )}

      {q.tradeOffs.length > 0 && (
        <Section icon="⚖️" title="Trade-offs">
          {q.tradeOffs.map((to, i) => (
            <div key={i} className={styles.tradeOff}>
              <strong className={styles.toTitle}>{to.title}</strong>
              <div className={styles.toGrid}>
                <div>
                  <div className={styles.toLabel} style={{ color: 'var(--accent)' }}>PROS</div>
                  {to.pros.map((p, j) => (
                    <div key={j} className={styles.toItem}>+ {p}</div>
                  ))}
                </div>
                <div>
                  <div className={styles.toLabel} style={{ color: 'var(--hard)' }}>CONS</div>
                  {to.cons.map((c, j) => (
                    <div key={j} className={styles.toItem}>– {c}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {q.bottlenecks.length > 0 && (
        <Section icon="⚠" title="Bottlenecks & Mitigations" variant="warning">
          {q.bottlenecks.map((b, i) => (
            <div key={i} className={styles.bottleneck}>
              <strong className={styles.bnTitle}>⚠ {b.title}</strong>
              <p className={styles.bnMitigation}>→ {b.mitigation}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}
