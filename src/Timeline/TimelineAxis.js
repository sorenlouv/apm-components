import React from 'react';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import { XYPlot, XAxis } from 'react-vis';
import LastTickValue from './LastTickValue';

const tickFormatSeconds = value => `${value / 1000} s`;
const tickFormatMilliSeconds = value => `${value} ms`;
const getTickFormat = _.memoize(
  highestValue =>
    highestValue < 5000 ? tickFormatMilliSeconds : tickFormatSeconds
);

const getXAxisTickValues = (tickValues, xMax) =>
  _.last(tickValues) * 1.05 > xMax ? tickValues.slice(0, -1) : tickValues;

function TimelineAxis({ xScale, xDomain, width, margins, tickValues, xMax }) {
  const tickFormat = getTickFormat(xMax);
  const xAxisTickValues = getXAxisTickValues(tickValues, xMax);

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
                tickValues={xAxisTickValues}
                tickFormat={tickFormat}
              />

              <LastTickValue x={xScale(xMax)} value={tickFormat(xMax)} />
            </XYPlot>
          </div>
        );
      }}
    </Sticky>
  );
}

export default TimelineAxis;
