import { Link } from 'react-router-dom';
import { copy, places, type Lang } from './data';
export const path = (lang: Lang, to = '') => `/${lang}${to ? '/' + to : ''}`;
export function External({ href, children, className = 'button' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}
export function PlaceCard({ index, lang, compact = false }: { index: number; lang: Lang; compact?: boolean }) {
  const p = places[index];
  return <Link className={`place-card ${compact ? 'compact' : ''}`} to={path(lang, `places/${p.id}`)}>
    <span className="number" style={{ background: p.color }}>{String(index + 1).padStart(2, '0')}</span>
    <span className="place-card-text"><strong>{p.name[lang]}</strong><span>{p.category[lang]}</span></span><span className="arrow" aria-hidden="true">→</span>
  </Link>;
}
export function PageHead({ kicker, title, description, children }: { kicker: string; title: string; description?: string; children?: React.ReactNode }) {
  return <div className="page-heading"><div><p className="kicker">{kicker}</p><h1>{title}</h1>{description && <p className="lead">{description}</p>}</div>{children}</div>;
}
export function Schematic({ lang, selected = -1, onSelect }: { lang: Lang; selected?: number; onSelect?: (index: number) => void }) {
  const points = [[41, 23], [58, 47], [37, 71], [63, 83]];
  return <div className="schematic"><svg viewBox="0 0 696 466" preserveAspectRatio="none" aria-hidden="true">
    <rect width="696" height="466" fill="#E8E3D6"/><path d="M60 0C180 140 120 340 160 466" stroke="#B8C7BE" strokeWidth="110" fill="none"/>
    <path d="M240 30L360 140L320 310L450 450M250 200L656 180M210 360L666 350" stroke="#FDFBF5" strokeWidth="24" fill="none"/>
  </svg><span className="map-note">{lang === 'th' ? 'แผนผังย่าน • ไม่ใช่มาตราส่วนจริง' : 'Neighbourhood diagram • Not to scale'}</span>
    {points.map(([x, y], i) => onSelect ? <button key={i} className={`marker ${selected === i ? 'selected' : ''}`} style={{ left: `${x}%`, top: `${y}%` }} onClick={() => onSelect(i)} aria-pressed={selected === i} aria-label={places[i].name[lang]}>{String(i + 1).padStart(2, '0')}</button> : <Link key={i} className="marker" style={{ left: `${x}%`, top: `${y}%` }} to={path(lang, `places/${places[i].id}`)} aria-label={places[i].name[lang]}>{String(i + 1).padStart(2, '0')}</Link>)}
    <span className="river-label">{lang === 'th' ? 'แม่น้ำเจ้าพระยา' : 'Chao Phraya River'}</span>
  </div>;
}
export function Footer({ lang }: { lang: Lang }) {
  return <footer><div className="container footer-inner"><div><Link className="brand" to={path(lang)}>NOI NOW</Link><p>{lang === 'th' ? 'มองให้ใกล้ ค้นพบให้มากขึ้น' : 'Look closer. Discover more.'}</p></div><div><p>{lang === 'th' ? 'ตลาดน้อย • กรุงเทพฯ' : 'Talat Noi • Bangkok'}</p><Link to={path(lang, 'about')}>{copy.about[lang]} · {lang === 'th' ? 'แหล่งข้อมูล' : 'Sources'}</Link></div></div></footer>;
}
