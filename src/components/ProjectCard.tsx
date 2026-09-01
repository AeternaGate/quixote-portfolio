import { type ReactNode } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  color: string;
  href: string;
  isExternal?: boolean;
  children?: ReactNode;
}

export default function ProjectCard({
  title,
  description,
  tags,
  color,
  href,
  isExternal = false,
  children,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="project-card"
      style={{ '--card-color': color } as React.CSSProperties}
    >
      <div className="project-card__inner">
        <div className="project-card__thumb" aria-hidden="true">
          <svg
            viewBox="0 0 400 225"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <rect width="400" height="225" fill="url(#cardGrad)" />
            <defs>
              <linearGradient id="cardGrad" x1="0" y1="0" x2="400" y2="225" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                <stop offset="50%" stopColor={color} stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0c0303" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="112" r="48" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
            <path
              d="M200 80v32M184 96h32"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        <div className="project-card__content">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__desc">{description}</p>

          <div className="project-card__tags">
            {tags.map((tag) => (
              <span key={tag} className="project-card__tag" style={{ borderColor: color }}>
                {tag}
              </span>
            ))}
          </div>

          {children && <div className="project-card__extra">{children}</div>}
        </div>

        <span className="project-card__link" aria-label={title}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </span>
      </div>

      <div className="project-card__glow" aria-hidden="true" />
    </a>
  );
}