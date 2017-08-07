import _ from 'lodash';
import React, { PureComponent } from 'react';
import SingleRect from './SingleRect';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalRectSeries
} from 'react-vis';

// LAYOUT CONSTANTS
const MARGIN_LEFT = 100;

const NUM_OF_X_TICK = 9;
const MARGIN_TOP = 20;
const PLOT_HEIGHT = 120;
const SINGLE_RECT_HEIGHT = PLOT_HEIGHT - MARGIN_TOP * 3;

function getYMax(graphItems) {
  return Math.max(...graphItems.map(item => item.y));
}

function getYMaxRounded(yMax) {
  const initialBase = Math.floor(Math.log10(yMax));
  const base = initialBase > 2 ? initialBase - 1 : initialBase;
  return Math.ceil(yMax / 10 ** base) * 10 ** base;
}

class Histogram extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hoveredBucket: null
    };
  }

  componentDidMount() {
    const elm = document.querySelector('.rv-xy-plot__series--rect');
    if (elm) {
      this.graphInnerWidth = elm.getBoundingClientRect().width;
    }
  }

  onHover = (value, { event }) => {
    this.updateHover(event.clientX);
  };

  onLeave = () => {
    this.updateHover();
  };

  onClick = event => {
    const bucketIndex = Math.round(
      event.target.x.baseVal.value / this.getBucketWidth()
    );
    if (bucketIndex >= 0) {
      this.props.onClick(bucketIndex);
    }
  };

  getBucketCount() {
    return _.size(this.props.graphItems);
  }

  getBucketWidth() {
    return this.graphInnerWidth / this.getBucketCount();
  }

  updateHover = _.throttle(clientX => {
    let hoveredBucket = null;
    if (clientX) {
      const index = Math.floor((clientX - MARGIN_LEFT) / this.getBucketWidth());
      hoveredBucket =
        _.get(this.props.graphItems, `[${index}].y`) > 0 ? index : null;
    }
    this.setState({ hoveredBucket });
  }, 20);

  render() {
    const { graphItems, bucketSize, selectedBucket } = this.props;
    const bucketCount = this.getBucketCount();

    if (!graphItems) {
      return null;
    }

    const yMax = getYMax(graphItems);
    const yMaxRounded = getYMaxRounded(yMax);
    const yTickValues = [yMaxRounded, yMaxRounded / 2];
    const XYPlotWidth = 900;

    return (
      <XYPlot
        onMouseDown={this.onClick}
        onMouseLeave={this.onLeave}
        margin={{ left: MARGIN_LEFT, top: MARGIN_TOP }}
        width={XYPlotWidth}
        height={PLOT_HEIGHT}
        xDomain={[0, bucketCount * bucketSize]}
        yDomain={[0, yMaxRounded]}
      >
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis
          marginRight={10}
          tickTotal={NUM_OF_X_TICK}
          tickFormat={x => {
            return `${x / 1000} ms`;
          }}
        />
        <YAxis
          marginTop={MARGIN_TOP}
          tickValues={yTickValues}
          tickFormat={y => {
            return `${y} reqs.`;
          }}
        />

        {Number.isInteger(this.state.hoveredBucket)
          ? <SingleRect
              height={SINGLE_RECT_HEIGHT}
              numberOfBuckets={bucketCount}
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
              numberOfBuckets={bucketCount}
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
          data={graphItems}
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
