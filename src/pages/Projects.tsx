import { Link } from 'react-router-dom';
import { useLang } from '../LangContext';
import Nav from '../components/Nav';
import LiquidEther from '../components/LiquidEther';
import ProjectCard from '../components/ProjectCard';
import '../components/ProjectCard.css';

const projects = [
  {
    key: 'projectAutopilot' as const,
    descKey: 'projectAutopilotDesc' as const,
    color: '#dc143c',
    colorRgb: '220, 20, 60',
    url: '#',
    tags: ['Telegram', 'Node.js', 'AI', 'Automation'],
    isExternal: false,
  },
  {
    key: 'projectAiToolbox' as const,
    descKey: 'projectAiToolboxDesc' as const,
    color: '#8b0000',
    colorRgb: '139, 0, 0',
    url: '#',
    tags: ['React', 'TypeScript', 'LLM', 'Tools'],
    isExternal: false,
  },
  {
    key: 'projectOpenSource' as const,
    descKey: 'projectOpenSourceDesc' as const,
    color: '#b22222',
    colorRgb: '178, 34, 34',
    url: 'https://github.com/AeternaGate',
    tags: ['Open Source', 'GitHub', 'Community'],
    isExternal: true,
  },
];

export default function Projects() {
  const { t } = useLang();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LiquidEther
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          colors={['#ff5d5d', '#ff3535', '#f92d2d']}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          isBounce={false}
          resolution={0.5}
          backgroundColor="#0c0303"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <div style={{ padding: '8rem 5vw 4rem', maxWidth: '1100px', margin: '0 auto' }}>
          <Link
            to="/"
            style={{
              color: 'var(--petal)',
              textDecoration: 'none',
              fontSize: '1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '3rem',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t.projectsBack}
          </Link>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, marginBottom: '4rem' }}>
            {t.projectsTitle}
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {projects.map((p) => (
              <ProjectCard
                key={p.key}
                title={t[p.key]}
                description={t[p.descKey]}
                tags={p.tags}
                color={p.color}
                href={p.url}
                isExternal={p.isExternal}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}