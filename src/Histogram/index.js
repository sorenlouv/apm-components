import React from 'react';
import d3 from 'd3';
import Histogram from './Histogram';
import response from './response.json';
import { getTimeFormatter, asRpm, getUnit } from '../formatters';

const buckets = getFormattedBuckets(response.buckets, response.bucketSize);

export function getFormattedBuckets(buckets, bucketSize) {
  if (!buckets) {
    return null;
  }

  const yMax = Math.max(...buckets.map(item => item.count));
  const yMin = yMax * 0.1;

  return buckets.map(({ count, key, transactionId }) => {
    return {
      transactionId,
      x0: key,
      x: key + bucketSize,
      y: count > 0 ? Math.max(count, yMin) : 0
    };
  });
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionId: null
    };
  }

  render() {
    const xMax = d3.max(buckets, d => d.x);
    const timeFormatter = getTimeFormatter(xMax);
    const unit = getUnit(xMax);
    return (
      <div>
        <Histogram
          buckets={buckets}
          bucketSize={response.bucketSize}
          transactionId={this.state.transactionId}
          onClick={selectedBucket => {
            this.setState({ transactionId: selectedBucket.transactionId });
          }}
          formatXValue={timeFormatter}
          formatYValue={asRpm}
          formatTooltipHeader={(hoveredX0, hoveredX) =>
            `${timeFormatter(hoveredX0, false)} - ${timeFormatter(
              hoveredX,
              false
            )} ${unit}`}
          tooltipLegendTitle="Requests"
        />

        <Histogram
          xType="time"
          buckets={buckets}
          bucketSize={response.bucketSize}
          formatYValue={value => `${value} err.`}
          tooltipLegendTitle="Occurences"
        />
      </div>
    );
  }
}
