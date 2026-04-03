import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROBLEM } from '../graphql/queries';
import DifficultyBadge from '../components/DifficultyBadge';
import Tag from '../components/Tag';
import Section from '../components/Section';
import CodeBlock from '../components/CodeBlock';
import Loading from '../components/Loading';
import styles from './ProblemDetailPage.module.css';
import Markdown from '../components/Markdown';

const approachLabels = {
  naive: { label: 'Naive', color: 'var(--warning)' },
  suboptimal: { label: 'Suboptimal', color: 'var(--medium)' },
  optimal: { label: 'Optimal', color: 'var(--accent)' },
};

export default function ProblemDetailPage() {
  const { slug } = useParams();
  const { data, loading } = useQuery(GET_PROBLEM, { variables: { slug } });
  const [activeLang, setActiveLang] = useState('python');

  if (loading) return <Loading />;

  const p = data?.problem;
  if (!p) return <div>Problem not found</div>;

  return (
    <div className="fade-in">
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.id}>#{p.id}</span>
          <DifficultyBadge difficulty={p.difficulty.toLowerCase()} />
        </div>
        <h1 className={styles.title}>{p.name}</h1>
        <a href={p.leetcodeUrl} target="_blank" rel="noopener noreferrer" className={styles.lcLink}>
          LeetCode ↗
        </a>
      </div>

      {p.useCases.length > 0 && (
        <Section icon="💡" title="Real-World Use Cases">
          {p.useCases.map((uc, i) => (
            <div key={i} className={styles.useCase}>{uc}</div>
          ))}
        </Section>
      )}

      {p.analysisHtml && (
        <Section icon="🧠" title="Analysis">
        <Markdown content={p.analysisHtml} />
        </Section>
      )}

      {p.solutions.map((sol, idx) => {
        const approach = approachLabels[sol.approach.toLowerCase()] || approachLabels.naive;
        const isOptimal = sol.approach === 'optimal';

        return (
          <div key={sol.slug} className={styles.solutionBlock}>
            {idx > 0 && (
              <div className={styles.divider}>
                <span className={styles.dividerArrow}>↓</span>
                <span className={styles.dividerText}>optimizing...</span>
              </div>
            )}

            <div className={styles.solutionHeader}>
              <span style={{ color: approach.color, fontWeight: 600 }}>
                {isOptimal ? '✦ ' : ''}{approach.label} Solution
              </span>
            </div>

            <Section>
              <div className={styles.solTitle}>
                <span className={styles.solIcon}>{isOptimal ? '✦' : '○'}</span>
                <strong>{sol.name}</strong>
                <Tag>⏱ {sol.timeComplexity}</Tag>
                <Tag>💾 {sol.spaceComplexity}</Tag>
              </div>

              {sol.overviewHtml && (
                <p className={styles.solOverview}>{sol.overviewHtml}</p>
              )}

              {sol.tags.length > 0 && (
                <div className={styles.solTags}>
                  {sol.tags.map((t) => (
                    <Tag key={t} variant="accent">{t}</Tag>
                  ))}
                </div>
              )}

              {sol.pseudocodeHtml && (
                <div className={styles.pseudoBlock}>
                  <div className={styles.pseudoLabel}>PSEUDOCODE</div>
                  <pre className={styles.pseudo}>{sol.pseudocodeHtml}</pre>
                </div>
              )}

              {sol.implementations.length > 0 && (
                <div className={styles.codeSection}>
                  <div className={styles.langTabs}>
                    {sol.implementations.map((impl) => (
                      <button
                        key={impl.language}
                        className={`${styles.langTab} ${activeLang === impl.language ? styles.langTabActive : ''}`}
                        onClick={() => setActiveLang(impl.language)}
                      >
                        {impl.language}
                      </button>
                    ))}
                  </div>
                  {sol.implementations
                    .filter((impl) => impl.language === activeLang)
                    .map((impl) => (
                      <CodeBlock key={impl.language} code={impl.codeContent} language={impl.language} />
                    ))}
                </div>
              )}

              {sol.issues.length > 0 && (
                <div className={styles.issues}>
                  <div className={styles.issuesLabel}>⚠ ISSUES</div>
                  {sol.issues.map((issue, i) => (
                    <div key={i} className={styles.issue}>{issue}</div>
                  ))}
                </div>
              )}
            </Section>
          </div>
        );
      })}
    </div>
  );
}
