import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const copy = {
  bs: { links: ['Prodaja', 'Najam', 'Novosti', 'O nama'], contact: 'Kontakt', headline: ['Pronađite prostor', 'za svoje novo poglavlje.'], intro: 'Nekretnine za prodaju i najam, uz ličan pristup od prvog razgovora do ključeva.', explore: 'Istražite nekretnine', pause: 'Pauziraj video', play: 'Pokreni video', menu: 'Navigacija' },
  en: { links: ['Sale', 'Rent', 'Journal', 'About us'], contact: 'Contact', headline: ['Find a place', 'for your next chapter.'], intro: 'Homes for sale and rent, with personal guidance from the first conversation to the keys.', explore: 'Explore properties', pause: 'Pause video', play: 'Play video', menu: 'Navigation' },
};

function App() {
  const [language, setLanguage] = useState<'bs' | 'en'>('bs');
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const t = copy[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  return <>
    <header className="nav">
      <a className="logo" href="./" aria-label="Metropola"><img src="/assets/logo.png" alt="Metropola Nekretnine" /></a>
      <nav className={`navlinks${menuOpen ? ' open' : ''}`} id="navigation" aria-label={t.menu}>
        {t.links.map(label => <a key={label} href="https://metropolanekretnine.ba/">{label}</a>)}
        <a className="nav-contact" href="mailto:info@metropolanekretnine.ba">{t.contact} ↗</a>
      </nav>
      <button className="lang" onClick={() => setLanguage(language === 'bs' ? 'en' : 'bs')} aria-label={language === 'bs' ? 'Switch to English' : 'Prebaci na bosanski'}>{language === 'bs' ? <><b>BS</b> / EN</> : <>BS / <b>EN</b></>}</button>
      <a className="contact" href="mailto:info@metropolanekretnine.ba">{t.contact} ↗</a>
      <button className="mobile-menu" aria-label={t.menu} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)} onKeyDown={e => { if (e.key === 'Escape') setMenuOpen(false); }}>{menuOpen ? '×' : '☰'}</button>
    </header>
    <main>
      <section className={`hero${videoReady ? ' video-on' : ''}`} aria-labelledby="hero-title">
        <video ref={video} className="hero-video" src="/assets/sarajevo-aerial.mp4" muted loop playsInline preload="auto" aria-hidden="true" onPlaying={() => { setPlaying(true); setVideoReady(true); }} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setVideoReady(false); }} />
        <div className="hero-content">
          <h1 id="hero-title">{t.headline[0]}<br />{t.headline[1]}</h1>
          <p>{t.intro}</p>
          <a className="explore" href="https://metropolanekretnine.ba/">{t.explore}<span aria-hidden="true">→</span></a>
        </div>
        <button className="video-control" aria-label={playing ? t.pause : t.play} onClick={() => { if (playing) video.current?.pause(); else void video.current?.play().catch(() => {}); }}>{playing ? 'Ⅱ' : '▷'}</button>
      </section>
    </main>
  </>;
}
createRoot(document.getElementById('root')!).render(<App />);
