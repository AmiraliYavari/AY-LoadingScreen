import { useState } from 'react'
import { SERVER, ABOUT_TEXT, RULES } from './data'
import Team from './Team.jsx'
import LoadingBar from './LoadingBar.jsx'
import MusicPlayer from './MusicPlayer.jsx'

export default function App() {
  const [tab, setTab] = useState('about')

  return (
    <div className="screen">
      <div className="wallpaper" />
      <div className="vignette" />
      <div className="grain" />
      <div className="beam" />
      <div className="embers" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <MusicPlayer />

      <div className="layout">
        {/* LEFT — identity + loading bar */}
        <section className="hero">
          <span className="hero__code">{SERVER.code}</span>

          <h1 className="hero__title">
            {SERVER.name.split(' ').map((w, i) => (
              <span className="hero__word" key={i}>
                {w}
              </span>
            ))}
          </h1>

          <p className="hero__tagline">{SERVER.tagline}</p>

          <div className="hero__spacer" />

          <LoadingBar />
        </section>

        {/* RIGHT — dossier panel */}
        <aside className="dossier">
          <div className="dossier__tabs">
            <button
              className={tab === 'about' ? 'is-active' : ''}
              onClick={() => setTab('about')}
            >
              درباره شهر
            </button>
            <button
              className={tab === 'team' ? 'is-active' : ''}
              onClick={() => setTab('team')}
            >
              تیم مدیریتی
            </button>
          </div>

          <div className="dossier__body">
            {tab === 'about' ? (
              <>
                <p className="dossier__text">{ABOUT_TEXT}</p>
                <p className="dossier__subhead">قوانین پایه</p>
                <ul className="dossier__rules">
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

          <div className="dossier__footer">CONFIDENTIAL — CITY HALL ARCHIVE</div>
        </aside>
      </div>
    </div>
  )
}