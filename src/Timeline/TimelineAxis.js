import React from 'react';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import { XYPlot, XAxis, VerticalGridLines } from 'react-vis';
import ActiveTickValue from './ActiveTickValue';

const tickFormatSeconds = value => `${value / 1000} s`;
const tickFormatMilliSeconds = value => `${value} ms`;
const getTickFormat = _.memoize(
  highestValue =>
    highestValue < 5000 ? tickFormatMilliSeconds : tickFormatSeconds
);

function TimelineAxis({ xScale, xDomain, width, margins, tickValues }) {
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
                tickValues={tickValues}
                tickFormat={tickFormat}
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
