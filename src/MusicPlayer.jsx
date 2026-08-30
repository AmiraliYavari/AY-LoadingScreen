import { useEffect, useRef, useState } from 'react'
import { SERVER } from './data'

// Put your track at public/music/theme.mp3 (see README).
// NOTE: must be a relative path (./...), not /music/... — FiveM's NUI
// origin isn't your site root, so an absolute path 404s after build.
const TRACK_SRC = './music/theme.mp3'
const TRACK_NAME = `${SERVER.name} — Theme`

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    // Try to autoplay as soon as the screen mounts. FiveM's NUI (CEF)
    // isn't a regular browser tab, so it generally allows this without
    // a click — but if a stricter context blocks it, we just fall back
    // to the manual play button instead of throwing.
    const a = audioRef.current
    if (!a) return
    a.volume = volume
    a.play().then(() => setPlaying(true)).catch((err) => {
      console.warn('[MusicPlayer] autoplay blocked, waiting for manual play:', err)
      setPlaying(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      // play() returns a promise — browsers block autoplay without a
      // user gesture, but this click IS the gesture, so it's allowed.
      a.play().then(() => setPlaying(true)).catch((err) => {
        console.error('[MusicPlayer] play() failed:', err)
        setPlaying(false)
      })
    }
  }

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        loop
        preload="auto"
        onError={() => console.error(`[MusicPlayer] could not load "${TRACK_SRC}" — check the file exists at public/music/theme.mp3`)}
      />

      <button className="player__btn" onClick={toggle} aria-label={playing ? 'توقف' : 'پخش'}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="14" height="14"><rect x="5" y="4" width="5" height="16" fill="currentColor" /><rect x="14" y="4" width="5" height="16" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14"><polygon points="6,4 20,12 6,20" fill="currentColor" /></svg>
        )}
      </button>

      <div className={`player__eq ${playing ? 'is-playing' : ''}`} aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="player__meta">
        <span className="player__track">{TRACK_NAME}</span>
        <input
          className="player__volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="میزان صدا"
        />
      </div>
    </div>
  )
}