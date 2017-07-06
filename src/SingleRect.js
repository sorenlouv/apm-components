import React from 'react';
import PropTypes from 'prop-types';

function SingleRect({
  innerWidth,
  borderRadius,
  className,
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
        className={className}
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
  className: PropTypes.string,
  numberOfBuckets: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  borderRadius: PropTypes.bool,
  innerWidth: PropTypes.number, // From react-vis
  x: PropTypes.number
};

export default SingleRect;
