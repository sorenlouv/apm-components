import React from 'react';
import _ from 'lodash';
import { Hint } from 'react-vis';
import moment from 'moment';

export function Tooltip({ hoveredPoints, series, y, ...props }) {
  if (_.isEmpty(hoveredPoints)) {
    return null;
  }
  const x = hoveredPoints[0].x;
  const timestamp = moment(x).format('MMMM Do YYYY, HH:mm');
  return (
    <Hint {...props} value={{ x, y }}>
      <div
        style={{
          border: '1px solid #eee',
          background: '#fff',
          color: '#000',
          transform: 'translateY(-50%)',
          marginLeft: '20px'
        }}
      >
        <div>{timestamp}</div>
        {hoveredPoints.map((point, i) => (
          <p key={i}>
            {series[i].titleShort}: {point.y}
          </p>
        ))}
      </div>
    </Hint>
  );
}
