import { TEAM } from './data'

export default function Team() {
  return (
    <div className="team">
      {TEAM.map((m) => (
        <div className="team__card" key={m.tag}>
          <div className="team__photo">
            <span>{m.initials}</span>
          </div>
          <div className="team__info">
            <p className="team__name">{m.name}</p>
            <p className="team__role">{m.role}</p>
          </div>
          <span className="team__stamp">{m.tag}</span>
        </div>
      ))}
    </div>
  )
}
