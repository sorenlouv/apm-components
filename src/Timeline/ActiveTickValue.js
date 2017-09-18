import React from 'react';

export default function ActiveTickValue({ x, marginTop, value }) {
  return (
    <g transform={`translate(${x}, ${marginTop})`}>
      <text textAnchor="middle" dy="0" transform="translate(0, -8)">
        {value}
      </text>
    </g>
  );
}

ActiveTickValue.requiresSVG = true;
