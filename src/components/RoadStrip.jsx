/** The little car that drives across under the services ticker. */
export default function RoadStrip() {
  return (
    <div aria-hidden="true">
      <div className="lane">
        <div className="drv">
          <i className="puff" />
          <svg viewBox="0 0 96 46">
            <path d="M8 30 15 16c2-4 6-6 10-6h34c5 0 9 2 12 6l9 12c5 1 8 3 8 7v4H8v-9Z" fill="#f56b2a" />
            <path d="M26 14h16v12H20l6-12ZM46 14h12c3 0 5 1 7 4l5 8H46V14Z" fill="#ffd9c2" />
            <rect x="84" y="31" width="6" height="4" rx="2" fill="#fff3b0" />
            {[27, 70].map((cx) => (
              <g className="wh" key={cx}>
                <circle cx={cx} cy="38" r="7" fill="#1b1a19" />
                <circle cx={cx} cy="38" r="2.5" fill="#d8d4cc" />
                <path d={`M${cx} 32v12M${cx - 6} 38h12`} stroke="#5a5852" strokeWidth="1.4" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
