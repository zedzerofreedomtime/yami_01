import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { copy, type Lang } from './data';
import { About, Explore, Home, MapPage, NotFound, ObjectDetail, Objects, PlaceDetail, Stories, searchItems } from './pages';
import { Footer, path } from './ui';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const lang: Lang = location.pathname.split('/')[1] === 'en' ? 'en' : 'th';
  const th = lang === 'th';
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const menu = useRef<HTMLDialogElement>(null);
  const searchDialog = useRef<HTMLDialogElement>(null);
  const main = useRef<HTMLElement>(null);
  const changedRoute = useRef(false);
  const otherLang: Lang = th ? 'en' : 'th';
  const otherPath = `/${otherLang}/${location.pathname.split('/').slice(2).join('/')}`.replace(/\/$/, '') + location.search;
  const navItems = ['explore', 'stories', 'map', 'about'] as const;
  const routeSection = location.pathname.split('/')[2] || 'explore';
  const activeSection = routeSection === 'places' ? 'explore' : routeSection === 'objects' ? 'stories' : routeSection;
  useEffect(() => {
    setMenuOpen(false); setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const page = location.pathname.split('/')[2];
    const label = navItems.includes(page as typeof navItems[number]) ? copy[page as typeof navItems[number]][lang] : th ? 'มองให้ใกล้ ค้นพบให้มากขึ้น' : 'Look closer. Discover more.';
    document.title = `NOI NOW — ${label}`;
    document.documentElement.lang = lang;
    if (changedRoute.current) main.current?.focus({ preventScroll: true });
    changedRoute.current = true;
  // Navigation labels are constants; the effect follows URL and language only.
  }, [location.pathname, lang, th]);
  useEffect(() => { if (menuOpen) menu.current?.showModal(); else menu.current?.close(); }, [menuOpen]);
  useEffect(() => { if (searchOpen) searchDialog.current?.showModal(); else searchDialog.current?.close(); }, [searchOpen]);
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen, searchOpen]);
  useEffect(() => {
    function shortcut(e: KeyboardEvent) { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(v => !v); } }
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  const results = searchItems(lang).filter(p => !search.trim() || p.keywords.normalize('NFKC').toLocaleLowerCase().includes(search.trim().normalize('NFKC').toLocaleLowerCase())).slice(0, 8);
  return <>
    <a className="skip-link" href="#main">{th ? 'ข้ามไปเนื้อหา' : 'Skip to content'}</a>
    <header className="site-header"><div className="container header-inner"><Link className="brand" to={path(lang)} aria-label={th ? 'NOI NOW หน้าแรก' : 'NOI NOW Home'}>NOI NOW</Link><nav className="desktop-nav" aria-label={th ? 'เมนูหลัก' : 'Main navigation'}>{navItems.map(item => <NavLink key={item} to={path(lang, item)} className={({ isActive }) => `nav-link ${isActive || activeSection === item ? 'active' : ''}`}>{copy[item][lang]}</NavLink>)}</nav><Link className="pill language desktop-language" to={otherPath} lang={otherLang} aria-label={th ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}>{th ? 'TH / EN' : 'EN / TH'}</Link><button className="mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label={th ? 'เปิดเมนู' : 'Open menu'} aria-haspopup="dialog" aria-expanded={menuOpen}><span/><span/></button></div></header>
    <main id="main" ref={main} tabIndex={-1}><Routes><Route path="/" element={<Navigate to="/th" replace/>}/><Route path="/:lang" element={<ValidLanguage lang={lang}><Home lang={lang}/></ValidLanguage>}/><Route path="/:lang/explore" element={<ValidLanguage lang={lang}><Explore lang={lang}/></ValidLanguage>}/><Route path="/:lang/map" element={<ValidLanguage lang={lang}><MapPage lang={lang}/></ValidLanguage>}/><Route path="/:lang/stories" element={<ValidLanguage lang={lang}><Stories lang={lang}/></ValidLanguage>}/><Route path="/:lang/stories/:id" element={<ValidLanguage lang={lang}><PlaceDetail lang={lang} story/></ValidLanguage>}/><Route path="/:lang/objects" element={<ValidLanguage lang={lang}><Objects lang={lang}/></ValidLanguage>}/><Route path="/:lang/objects/:id" element={<ValidLanguage lang={lang}><ObjectDetail lang={lang}/></ValidLanguage>}/><Route path="/:lang/places/:id" element={<ValidLanguage lang={lang}><PlaceDetail lang={lang}/></ValidLanguage>}/><Route path="/:lang/about" element={<ValidLanguage lang={lang}><About lang={lang}/></ValidLanguage>}/><Route path="*" element={<NotFound lang={lang}/>}/></Routes></main>
    <Footer lang={lang}/>
    <dialog className="mobile-menu" ref={menu} onCancel={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)} aria-labelledby="menu-title"><div className="menu-top"><Link className="brand" to={path(lang)} onClick={() => setMenuOpen(false)}>NOI NOW</Link><button className="close-button" onClick={() => setMenuOpen(false)} aria-label={th ? 'ปิดเมนู' : 'Close menu'}>×</button></div><h2 id="menu-title">{th ? 'มองให้ใกล้' : 'Look closer'}</h2><nav aria-label={th ? 'เมนูมือถือ' : 'Mobile navigation'}>{navItems.map(item => <Link key={item} to={path(lang, item)} onClick={() => setMenuOpen(false)}>{copy[item][lang]}<span aria-hidden="true">→</span></Link>)}</nav><button className="menu-search" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>{copy.search[lang]} <span aria-hidden="true">⌕</span></button><Link className="button cream" to={otherPath} onClick={() => setMenuOpen(false)}>{th ? 'TH / EN' : 'EN / TH'}</Link><p>{th ? 'ตลาดน้อย • กรุงเทพฯ' : 'Talat Noi • Bangkok'}</p></dialog>
    <dialog ref={searchDialog} className="search-dialog" onCancel={() => setSearchOpen(false)} onClose={() => setSearchOpen(false)} aria-labelledby="search-title" onClick={e => { if (e.target === e.currentTarget) setSearchOpen(false); }}><div className="search-dialog-inner"><div className="dialog-heading"><h2 id="search-title">{th ? 'ค้นหาจากสถานที่' : 'Find a place'}</h2><button className="close-button" aria-label={th ? 'ปิดค้นหา' : 'Close search'} onClick={() => setSearchOpen(false)}>×</button></div><form onSubmit={e => { e.preventDefault(); setSearchOpen(false); navigate(path(lang, `explore?q=${encodeURIComponent(search)}`)); }}><label className="search-field"><span className="sr-only">{copy.search[lang]}</span><input autoFocus type="search" value={search} placeholder={copy.search[lang]} onChange={e => setSearch(e.target.value)}/></label></form><div className="search-suggestions" aria-live="polite">{results.length ? results.map(r => <Link key={r.id} to={path(lang, r.to)} onClick={() => setSearchOpen(false)}><span>{r.title}<small>{r.subtitle}</small></span><span aria-hidden="true">→</span></Link>) : <p>{th ? 'ไม่พบรายการที่ตรงกับคำค้น ลองคำอื่น' : 'No results. Try another word.'}</p>}</div></div></dialog>
  </>;
}
function ValidLanguage({ children, lang }: { children: React.ReactNode; lang: Lang }) { const location = useLocation(); return /^\/(th|en)(\/|$)/.test(location.pathname) ? children : <NotFound lang={lang}/>; }
