import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import SingleRect from './SingleRect';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalRectSeries
} from 'react-vis';

// Constants
const NUM_OF_X_TICK = 9;
const NUMBER_OF_BUCKETS = 28; // TODO: this should be 27 after POC

// LAYOUT CONSTANTS
const WIDTH = 900;
const MARGIN_LEFT = 100;
const MARGIN_TOP = 20;
const PLOT_HEIGHT = 120;
const SINGLE_RECT_HEIGHT = PLOT_HEIGHT - MARGIN_TOP * 3;
const BUCKET_WIDTH = (WIDTH - MARGIN_LEFT - 10) / NUMBER_OF_BUCKETS;

const sortNumerical = (a, b) => a - b;

// Max number of transactions for a single bucket
function getYMax(distribution) {
  return _.last(Object.values(distribution).sort(sortNumerical));
}

function getGraphData(distribution, bucketSize, yMax) {
  function getYValue(i) {
    const yValue = distribution[i * bucketSize];
    const minYValue = yMax * 0.1; // minimum bucket value is 10% of the highest bucket value
    if (!yValue) {
      return 0;
    } else if (yValue > minYValue) {
      return yValue;
    } else {
      return minYValue;
    }
  }

  return _.range(NUMBER_OF_BUCKETS).map(i => {
    return {
      x0: i * bucketSize,
      x: (i + 1) * bucketSize,
      y: getYValue(i)
    };
  });
}

//  Format of data:
//   distribution: {
//     '0': 5667,
//     '1867894': 2,
//     '50433138': 1
//   }
//   bucketSize: 1867894

class Histogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredBucket: null
    };
  }

  onHover = _.throttle((value, { event, innerX, index }) => {
    this.setState({ hoveredBucket: index });
  }, 20);

  onLeave = () => {
    this.setState({ hoveredBucket: null });
  };

  onClick = event => {
    const bucketIndex = Math.round(event.target.x.baseVal.value / BUCKET_WIDTH);
    this.props.onClick(bucketIndex);
  };

  render() {
    const { distribution, bucketSize, selectedBucket } = this.props;

    if (!distribution) {
      return null;
    }

    const yMax = getYMax(distribution);
    const yTickValues = [yMax / 2, yMax];
    const graphData = getGraphData(distribution, bucketSize, yMax);

    return (
      <XYPlot
        onMouseDown={this.onClick}
        onMouseLeave={this.onLeave}
        margin={{ left: MARGIN_LEFT, top: MARGIN_TOP }}
        width={WIDTH}
        height={PLOT_HEIGHT}
        xDomain={[0, NUMBER_OF_BUCKETS * bucketSize]}
        yDomain={[0, yMax * 1.3]}
      >
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis
          marginRight={10}
          tickTotal={NUM_OF_X_TICK}
          tickFormat={x => {
            return x / 1000 + ' ms';
          }}
        />
        <YAxis
          marginTop={MARGIN_TOP}
          tickValues={yTickValues}
          tickFormat={y => {
            return y + ' reqs.';
          }}
        />

        {Number.isInteger(this.state.hoveredBucket)
          ? <SingleRect
              height={SINGLE_RECT_HEIGHT}
              numberOfBuckets={NUMBER_OF_BUCKETS}
              x={this.state.hoveredBucket}
              marginLeft={MARGIN_LEFT}
              marginTop={MARGIN_TOP}
              style={{
                fill: '#dddddd'
              }}
            />
          : null}

        {Number.isInteger(selectedBucket)
          ? <SingleRect
              height={SINGLE_RECT_HEIGHT}
              numberOfBuckets={NUMBER_OF_BUCKETS}
              x={selectedBucket}
              marginLeft={MARGIN_LEFT}
              marginTop={MARGIN_TOP}
              style={{
                fill: 'transparent',
                stroke: 'rgb(172, 189, 220)'
              }}
            />
          : null}

        <VerticalRectSeries
          data={graphData}
          style={{
            stroke: 0,
            fill: 'rgb(172, 189, 216)',
            rx: '2px',
            ry: '2px'
          }}
          onNearestX={this.onHover}
        />
      </XYPlot>
    );
  }
}

export default Histogram;
