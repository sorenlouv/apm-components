import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import SingleRect from './SingleRect';
import {
  LineSeries,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries
} from 'react-vis';

// Constants
const NUM_OF_X_TICK = 9;
const WIDTH = 900;
const MARGIN_LEFT = 80;

const NUMBER_OF_BUCKETS = 27;
const MINIMUM_DURATION_PER_BUCKET = 15; // minimum duration in ms
const MINIMUM_TOTAL_DURATION = MINIMUM_DURATION_PER_BUCKET * NUMBER_OF_BUCKETS; // The minimum total duration for all buckets

const DATA = {
  '0': 5667,
  '1867894': 2,
  '50433138': 1
};

function sortNumerical(a, b) {
  return a - b;
}

// Max number of transactions
function getYMax(data) {
  return _.last(Object.values(data).sort(sortNumerical));
}

// Max bucket duration
function getXMax(data) {
  const maxX = _.last(
    Object.keys(data).map(a => parseInt(a, 10)).sort(sortNumerical)
  );

  return maxX > MINIMUM_TOTAL_DURATION ? maxX : MINIMUM_TOTAL_DURATION;
}

function getXTicks() {
  return _.range(NUM_OF_X_TICK);
}

const yMax = getYMax(DATA);
const durationPerBucket = getXMax(DATA) / NUMBER_OF_BUCKETS;
const yValues = [yMax / 2, yMax];
const xTicks = getXTicks();
const graphWidth = WIDTH - MARGIN_LEFT;

function onHover(item) {
  console.log(item.x, item.x0);
}

class App extends Component {
  render() {
    return (
      <XYPlot
        margin={{ left: MARGIN_LEFT, top: 20 }}
        width={WIDTH}
        height={100}
        xDomain={[1, 26]}
      >
        <VerticalGridLines />
        <HorizontalGridLines tickValues={yValues} />
        <XAxis
          marginRight={10}
          tickValues={xTicks}
          tickFormat={x => {
            return x + ' ms';
          }}
        />
        <YAxis
          marginTop={20}
          tickValues={yValues}
          tickFormat={y => {
            return y + ' reqs.';
          }}
        />

        <SingleRect
          height={50}
          blockCount={21}
          x={1}
          marginLeft={MARGIN_LEFT}
        />
        <VerticalRectSeries
          data={DATA}
          style={{ stroke: '#fff' }}
          onNearestX={onHover}
        />

        {/*<LineSeries data={DATA} color="transparent" onNearestX={onHover} />*/}
      </XYPlot>
    );
  }
}

export default App;
