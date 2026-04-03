import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import PatternsPage from './pages/PatternsPage';
import PatternDetailPage from './pages/PatternDetailPage';
import SystemDesignPage from './pages/SystemDesignPage';
import SystemDesignDetailPage from './pages/SystemDesignDetailPage';

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        <Routes>
          <Route path="/" element={<ProblemsPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:slug" element={<ProblemDetailPage />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/patterns/:slug" element={<PatternDetailPage />} />
          <Route path="/system-design" element={<SystemDesignPage />} />
          <Route path="/system-design/:slug" element={<SystemDesignDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
