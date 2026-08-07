import { useEffect, useRef, useState } from 'react'
import { LOADING_STATUSES } from './data'

export default function LoadingBar() {
  const [progress, setProgress] = useState(0)
  const [statusIdx, setStatusIdx] = useState(0)
  const fakeTimer = useRef(null)

  useEffect(() => {
    // Real FiveM hook: the game client posts { eventName: 'loadProgress', loadFraction }
    // to the NUI window as the actual game assets stream in.
    function onMessage(e) {
      const data = e.data || {}
      if (data.eventName === 'loadProgress' && typeof data.loadFraction === 'number') {
        setProgress(Math.round(data.loadFraction * 100))
      }
    }
    window.addEventListener('message', onMessage)

    // Fallback simulation so the screen looks alive in a normal browser
    // (and so you can preview it with `bun run dev`). Remove this block
    // if you only ever want the real FiveM progress value.
    fakeTimer.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 4))
    }, 220)

    return () => {
      window.removeEventListener('message', onMessage)
      clearInterval(fakeTimer.current)
    }
  }, [])

  useEffect(() => {
    const step = Math.floor((progress / 100) * (LOADING_STATUSES.length - 1))
    setStatusIdx(step)
  }, [progress])

  const pct = Math.min(100, Math.round(progress))

  return (
    <div className="loadbar">
      <div className="loadbar__meta">
        <span className="loadbar__status">{LOADING_STATUSES[statusIdx]}</span>
        <span className="loadbar__pct">{String(pct).padStart(3, '0')}%</span>
      </div>

      <div className="loadbar__tape" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="loadbar__tape-fill" style={{ width: `${pct}%` }}>
          <span className="loadbar__tape-stripes" />
        </div>
      </div>

      <div className="loadbar__ticks">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={i < pct / 5 ? 'is-lit' : ''} />
        ))}
      </div>
    </div>
  )
}
