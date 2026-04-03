import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PATTERN } from '../graphql/queries';
import DifficultyBadge from '../components/DifficultyBadge';
import Tag from '../components/Tag';
import Section from '../components/Section';
import Loading from '../components/Loading';
import styles from './PatternDetailPage.module.css';

export default function PatternDetailPage() {
  const { slug } = useParams();
  const { data, loading } = useQuery(GET_PATTERN, { variables: { slug } });

  if (loading) return <Loading />;

  const pat = data?.pattern;
  if (!pat) return <div>Pattern not found</div>;

  return (
    <div className="fade-in">
      <div className={styles.header}>
        <span className={styles.icon}>{pat.icon}</span>
        <h1 className={styles.title}>{pat.name}</h1>
      </div>
      <p className={styles.tagline}>{pat.tagline}</p>

      {pat.overviewHtml && (
        <Section title="OVERVIEW">
          <div className={styles.markdown}>{pat.overviewHtml}</div>
          <div className={styles.complexities}>
            <Tag>⏱ {pat.timeComplexity}</Tag>
            <Tag>💾 {pat.spaceComplexity}</Tag>
          </div>
        </Section>
      )}

      {pat.whenToUse.length > 0 && (
        <Section icon="✅" title="When to Use">
          {pat.whenToUse.map((item, i) => (
            <div key={i} className={styles.listItem}>
              <span className={styles.check}>✓</span> {item}
            </div>
          ))}
        </Section>
      )}

      {pat.howItWorks && (
        <Section title="HOW IT WORKS">
          {pat.howItWorks.descriptionHtml && (
            <div className={styles.markdown}>{pat.howItWorks.descriptionHtml}</div>
          )}
          {pat.howItWorks.steps.length > 0 && (
            <div className={styles.steps}>
              {pat.howItWorks.steps.map((step, i) => (
                <div key={i} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {pat.keyInsight && (
        <Section icon="💡" title="Key Insight" variant="insight">
          <p className={styles.insight}>{pat.keyInsight}</p>
        </Section>
      )}

      {pat.pseudocodeHtml && (
        <div className={styles.pseudoSection}>
          <div className={styles.pseudoLabel}>PSEUDOCODE</div>
          <pre className={styles.pseudo}>{pat.pseudocodeHtml}</pre>
        </div>
      )}

      {pat.problems.length > 0 && (
        <Section icon="📖" title="Problems Using This Pattern">
          <div className={styles.problemList}>
            {pat.problems.map((prob) => (
              <a href={`/problems/${prob.slug}`} key={prob.slug} className={styles.problemRow}>
                <span>{prob.name}</span>
                <DifficultyBadge difficulty={prob.difficulty.toLowerCase()} />
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
