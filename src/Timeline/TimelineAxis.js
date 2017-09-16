import React from 'react';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import { XYPlot, XAxis, VerticalGridLines } from 'react-vis';

function getTickValuesWithHoveredX(tickValues, hoveredX) {
  const tolerance = (tickValues[1] - tickValues[0]) / 5;
  const high = hoveredX + tolerance;
  const low = hoveredX - tolerance;
  return tickValues
    .filter(value => {
      return !_.inRange(value, low, high);
    })
    .concat([hoveredX]);
}

function TimelineAxis({ x, width, margins, tickValues, hoveredX }) {
  const tickValuesWithHoveredX = getTickValuesWithHoveredX(
    tickValues,
    hoveredX
  );
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
              xDomain={x.domain()}
            >
              <XAxis
                hideLine
                orientation="top"
                tickSize={0}
                tickValues={tickValuesWithHoveredX}
                tickFormat={value => `${value / 1000} s`}
              />

              <VerticalGridLines tickValues={[3000]} />
            </XYPlot>
          </div>
        );
      }}
    </Sticky>
  );
}

export default TimelineAxis;
