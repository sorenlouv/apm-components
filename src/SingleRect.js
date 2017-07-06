import React from 'react';
import PropTypes from 'prop-types';

function SingleRect({
  innerWidth,
  borderRadius,
  className,
  height,
  blockCount,
  marginLeft,
  x
}) {
  const blockWidth = innerWidth / blockCount;
  return (
    <g transform={`translate(${marginLeft}, 10)`}>
      <rect
        style={{
          fill: '#dddddd'
        }}
        className={className}
        height={height}
        width={blockWidth}
        rx={borderRadius && '2px'}
        ry={borderRadius && '2px'}
        x={x * blockWidth}
      />
    </g>
  );
}

SingleRect.requiresSVG = true;

SingleRect.propTypes = {
  className: PropTypes.string,
  blockCount: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  borderRadius: PropTypes.bool,
  innerWidth: PropTypes.number, // From react-vis
  x: PropTypes.number
};

export default SingleRect;
