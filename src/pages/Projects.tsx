import { Link } from 'react-router-dom';
import { useLang } from '../LangContext';
import Nav from '../components/Nav';
import LiquidEther from '../components/LiquidEther';
import Folder from '../components/Folder';

const projects = [
  {
    key: 'projectAutopilot' as const,
    descKey: 'projectAutopilotDesc' as const,
    color: '#dc143c',
    url: '#',
  },
  {
    key: 'projectAiToolbox' as const,
    descKey: 'projectAiToolboxDesc' as const,
    color: '#8b0000',
    url: '#',
  },
  {
    key: 'projectOpenSource' as const,
    descKey: 'projectOpenSourceDesc' as const,
    color: '#b22222',
    url: 'https://github.com/AeternaGate',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
            }}
          >
            {projects.map((p) => (
              <a
                key={p.key}
                href={p.url}
                target={p.url.startsWith('http') ? '_blank' : undefined}
                rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '3rem 2rem',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  background: 'rgba(12, 3, 3, 0.6)',
                  backdropFilter: 'blur(8px)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--petal)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <Folder size={2} color={p.color} />
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 500, marginBottom: '0.5rem' }}>{t[p.key]}</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>{t[p.descKey]}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
