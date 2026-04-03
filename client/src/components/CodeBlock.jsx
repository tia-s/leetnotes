import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from './CodeBlock.module.css';

const theme = {
  'code[class*="language-"]': {
    color: '#f0f2f8',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.825rem',
    lineHeight: '1.6',
  },
  'pre[class*="language-"]': {
    color: '#f0f2f8',
    background: 'transparent',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.825rem',
    lineHeight: '1.6',
    margin: 0,
    padding: 0,
  },
  comment:     { color: '#4e5a72', fontStyle: 'italic' },
  keyword:     { color: '#c084fc' },
  string:      { color: '#4ecca3' },
  number:      { color: '#6ba3f5' },
  builtin:     { color: '#a78bfa', fontWeight: '600' },
  function:    { color: '#f0f2f8', fontWeight: '600' },
  operator:    { color: '#6b7594' },
  punctuation: { color: '#4e5a72' },
  'class-name': { color: '#f472b6' },
};

export default function CodeBlock({ code, language = 'python' }) {
  if (!code) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.lang}>{language.toUpperCase()}</span>
      </div>
      <div className={styles.code}>
        <SyntaxHighlighter language={language} style={theme} useInlineStyles={true}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
