import Icon from "./Icon.jsx";

/** A row of dashed "chips" with a label in front. items: [{icon, label}] */
export default function Chips({ label, items, className = "" }) {
  return (
    <div className={`chips rv ${className}`} data-stg>
      <b className="kick">{label}</b>
      {items.map((c) => (
        <span className="chip" key={c.icon}>
          <Icon name={c.icon} />
          <span>{c.label}</span>
        </span>
      ))}
    </div>
  );
}
