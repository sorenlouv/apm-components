import React from 'react';
import d3 from 'd3';
import Histogram from './Histogram';
import responseTimeData from './data/responseTime.json';
import errorOccurencesData from './data/errorOccurences.json';

import { getTimeFormatter, asRpm, getUnit } from '../formatters';

export function getFormattedBuckets(buckets, bucketSize) {
  if (!buckets) {
    return null;
  }

  return buckets.map(({ count, key, transactionId }) => {
    return {
      transactionId,
      x0: key,
      x: key + bucketSize,
      y: count
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
    const responseTimeBuckets = getFormattedBuckets(
      responseTimeData.buckets,
      responseTimeData.bucketSize
    );

    const xMax = d3.max(responseTimeBuckets, d => d.x);
    const timeFormatter = getTimeFormatter(xMax);
    const unit = getUnit(xMax);

    const errorOccurencesBuckets = getFormattedBuckets(
      errorOccurencesData.buckets,
      errorOccurencesData.bucketSize
    );

    return (
      <div>
        <Histogram
          buckets={responseTimeBuckets}
          bucketSize={responseTimeData.bucketSize}
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
          buckets={errorOccurencesBuckets}
          bucketSize={errorOccurencesData.bucketSize}
          formatYValue={value => `${value} err.`}
          tooltipLegendTitle="Occurences"
        />
      </div>
    );
  }
}
