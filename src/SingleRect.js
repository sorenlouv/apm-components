import React from 'react';
import PropTypes from 'prop-types';

function SingleRect({
  innerWidth,
  height,
  numberOfBuckets,
  marginLeft,
  marginTop,
  style,
  x
}) {
  const bucketWidth = innerWidth / numberOfBuckets;
  return (
    <g transform={`translate(${marginLeft}, ${marginTop})`}>
      <rect
        style={style}
        height={height}
        width={bucketWidth}
        rx={'2px'}
        ry={'2px'}
        x={x * bucketWidth}
      />
    </g>
  );
}

SingleRect.requiresSVG = true;

SingleRect.propTypes = {
  numberOfBuckets: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired, // From react-vis
  x: PropTypes.number.isRequired
};

export default SingleRect;
