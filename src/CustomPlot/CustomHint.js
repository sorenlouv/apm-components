import React from 'react';
import _ from 'lodash';
import { Hint } from 'react-vis';

export function CustomHint({ hoveredPoints, series, y, ...props }) {
  if (_.isEmpty(hoveredPoints)) {
    return null;
  }
  const x = hoveredPoints[0].x;
  return (
    <Hint {...props} value={{ x, y }}>
      <div
        style={{
          border: '1 px solid #eee',
          background: '#fff',
          color: '#000',
          transform: 'translateY(-50%)',
          marginLeft: '20px'
        }}
      >
        <div>{new Date(x).toString()}</div>
        {hoveredPoints.map((point, i) => (
          <p key={i}>
            {series[i].titleShort}: {point.y}
          </p>
        ))}
      </div>
    </Hint>
  );
}
