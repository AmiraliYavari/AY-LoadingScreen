import { TEAM } from './data'

export default function Team() {
  return (
    <ul className="roster">
      {TEAM.map((m) => (
        <li className="roster__item" key={m.tag}>
          <span className="roster__avatar">{m.initials}</span>
          <span className="roster__info">
            <span className="roster__name">{m.name}</span>
            <span className="roster__role">{m.role}</span>
          </span>
          <span className="roster__tag">{m.tag}</span>
        </li>
      ))}
    </ul>
  )
}