import React from 'react';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import { XYPlot, XAxis } from 'react-vis';
import LastTickValue from './LastTickValue';
import { px, colors } from '../../variables';

const tickFormatSeconds = value => `${value / 1000} s`;
const tickFormatMilliSeconds = value => `${value} ms`;
const getTickFormat = _.memoize(
  highestValue =>
    highestValue < 5000 ? tickFormatMilliSeconds : tickFormatSeconds
);

// Remove last tick if it's too close to xMax
const getXAxisTickValues = (tickValues, xMax) =>
  _.last(tickValues) * 1.05 > xMax ? tickValues.slice(0, -1) : tickValues;

function TimelineAxis({ header, plotValues }) {
  const { margins, tickValues, width, xDomain, xMax, xScale } = plotValues;
  const tickFormat = getTickFormat(xMax);
  const xAxisTickValues = getXAxisTickValues(tickValues, xMax);

  return (
    <Sticky disableCompensation>
      {({ style }) => {
        return (
          <div
            style={{
              position: 'absolute',
              backgroundColor: colors.white,
              borderBottom: `1px solid ${colors.gray3}`,
              height: px(margins.top),
              zIndex: 2,
              ...style
            }}
          >
            {header}
            <XYPlot
              dontCheckIfEmpty
              width={width}
              height={40}
              margin={{
                top: 40,
                left: margins.left,
                right: margins.right
              }}
              xDomain={xDomain}
            >
              <XAxis
                hideLine
                orientation="top"
                tickSize={0}
                tickValues={xAxisTickValues}
                tickFormat={tickFormat}
                style={{
                  text: { fill: colors.gray3 }
                }}
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
