import { useState } from 'react'
import { SERVER, ABOUT_TEXT, RULES } from './data'
import Team from './Team.jsx'
import LoadingBar from './LoadingBar.jsx'
import MusicPlayer from './MusicPlayer.jsx'

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16.5" />
      <circle cx="12" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2" />
      <circle cx="17" cy="9.5" r="2.3" />
      <path d="M16 13.6c2.5 0.2 4.5 2.3 4.5 5" />
    </svg>
  )
}

export default function App() {
  const [tab, setTab] = useState('about')

  return (
    <div className="screen" dir="rtl">
      {/* ===== background layers ===== */}
      <div className="bg-wallpaper" />
      <div className="vignette" aria-hidden="true" />
      <div className="frame" aria-hidden="true">
        <span className="frame__corner frame__corner--tl" />
        <span className="frame__corner frame__corner--tr" />
        <span className="frame__corner frame__corner--bl" />
        <span className="frame__corner frame__corner--br" />
      </div>

      <MusicPlayer />

      {/* ===== title ===== */}
      <header className="title">
        <span className="title__eyebrow">
          <span className="title__dot" />
          {SERVER.code}
        </span>
        <h1 className="title__name">{SERVER.name}</h1>
        <div className="title__divider" />
        <p className="title__tagline">{SERVER.tagline}</p>
      </header>

      {/* ===== info panel ===== */}
      <aside className="panel">
        <div className="panel__tabs">
          <button
            className={tab === 'about' ? 'is-active' : ''}
            onClick={() => setTab('about')}
          >
            <InfoIcon />
            درباره شهر
          </button>
          <button
            className={tab === 'team' ? 'is-active' : ''}
            onClick={() => setTab('team')}
          >
            <TeamIcon />
            تیم مدیریتی
          </button>
        </div>

        <div className="panel__body">
          {tab === 'about' ? (
            <>
              <p className="panel__text">{ABOUT_TEXT}</p>
              <p className="panel__subhead">قوانین پایه</p>
              <ul className="panel__rules">
                {RULES.map((r, i) => (
                  <li key={i}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {r}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Team />
          )}
        </div>
      </aside>

      {/* ===== loading HUD ===== */}
      <footer className="hud">
        <LoadingBar />
      </footer>
    </div>
  )
}