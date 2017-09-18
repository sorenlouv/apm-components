import React from 'react';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import { XYPlot, XAxis, VerticalGridLines } from 'react-vis';
import ActiveTickValue from './ActiveTickValue';

function getTickValuesWithHoveredX(tickValues, hoveredX) {
  if (hoveredX == null) {
    return tickValues;
  }

  const tolerance = (tickValues[1] - tickValues[0]) / 5;
  const high = hoveredX + tolerance;
  const low = hoveredX - tolerance;
  return tickValues.filter(value => {
    return !_.inRange(value, low, high);
  });
}

const tickFormatSeconds = value => `${value / 1000} s`;
const tickFormatMilliSeconds = value => `${value} ms`;
const getTickFormat = _.memoize(
  highestValue =>
    highestValue < 5000 ? tickFormatMilliSeconds : tickFormatSeconds
);

function TimelineAxis({
  xScale,
  xDomain,
  width,
  margins,
  tickValues,
  hoveredX
}) {
  const tickValuesWithHoveredX = getTickValuesWithHoveredX(
    tickValues,
    hoveredX
  );
  const tickFormat = getTickFormat(_.last(tickValues));

  return (
    <Sticky disableCompensation>
      {({ style }) => {
        return (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              borderBottom: '1px solid black',
              zIndex: 2,
              ...style
            }}
          >
            <XYPlot
              dontCheckIfEmpty
              width={width}
              height={margins.top}
              margin={margins}
              xDomain={xDomain}
            >
              <XAxis
                hideLine
                orientation="top"
                tickSize={0}
                tickValues={tickValuesWithHoveredX}
                tickFormat={tickFormat}
              />

              {hoveredX != null && (
                <ActiveTickValue
                  x={xScale(hoveredX)}
                  value={tickFormat(hoveredX)}
                />
              )}

              <VerticalGridLines tickValues={[3000]} />
            </XYPlot>
          </div>
        );
      }}
    </Sticky>
  );
}

export default TimelineAxis;
