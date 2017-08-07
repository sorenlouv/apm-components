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

const MARGIN_LEFT = 100;
const MARGIN_TOP = 20;
const NUM_OF_X_TICK = 9;
const PLOT_HEIGHT = 120;

function getYMax(buckets) {
  return Math.max(...buckets.map(item => item.y));
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

  onValueClick = value => {
    const bucketIndex = value.x0 / this.props.bucketSize;
    this.props.onClick(bucketIndex);
  };

  onHover = (value, { event, innerX, index }) => {
    const newIndex = innerX > event.layerX - MARGIN_LEFT ? index : index + 1;
    this.updateHover(newIndex);
  };

  onLeave = () => {
    this.updateHover(null);
  };

  getBucketCount() {
    return _.size(this.props.buckets);
  }

  getWithHighlightedBucket(items, selected) {
    return items.map((item, i) => {
      if (i === selected) {
        return { ...item, color: '#3360a3' };
      }
      return item;
    });
  }

  updateHover = _.throttle(index => {
    const hoveredBucket =
      _.get(this.props.buckets, `[${index}].y`) > 0 ? index : null;
    this.setState({ hoveredBucket });
  }, 20);

  render() {
    const { buckets, bucketSize, selectedBucket } = this.props;
    const bucketCount = this.getBucketCount();

    if (!buckets) {
      return null;
    }

    const yMax = getYMax(buckets);
    const yMaxRounded = getYMaxRounded(yMax * 1.1);
    const yTickValues = [yMaxRounded, yMaxRounded / 2];
    const XYPlotWidth = 900;

    return (
      <XYPlot
        onMouseLeave={this.onLeave}
        margin={{ left: MARGIN_LEFT, top: MARGIN_TOP }}
        width={XYPlotWidth}
        height={PLOT_HEIGHT}
        xDomain={[0, bucketCount * bucketSize]}
        yDomain={[0, yMaxRounded]}
      >
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis
          style={{ strokeWidth: '1px' }}
          marginRight={10}
          tickSizeOuter={10}
          tickSizeInner={0}
          tickTotal={NUM_OF_X_TICK}
          tickFormat={x => {
            return `${x / 1000000} s`;
          }}
        />
        <YAxis
          tickSize={0}
          hideLine
          marginTop={MARGIN_TOP}
          tickValues={yTickValues}
          tickFormat={y => {
            return `${y} reqs.`;
          }}
        />

        {Number.isInteger(this.state.hoveredBucket)
          ? <SingleRect
              onClick={this.props.onClick}
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
          colorType="literal"
          color="rgb(172, 189, 216)"
          stroke="#fff"
          onValueClick={this.onValueClick}
          data={this.getWithHighlightedBucket(buckets, selectedBucket)}
          style={{
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
