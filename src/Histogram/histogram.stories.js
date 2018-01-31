import React from 'react';
import { storiesOf } from '@storybook/react';
import d3 from 'd3';
import Histogram from './Histogram';
import responseTimeData from './data/responseTime.json';
import errorOccurencesData from './data/errorOccurences.json';
import getFormattedBuckets from './Histogram/getFormattedBuckets';
import { getTimeFormatter, asInteger, timeUnit } from '../formatters';

class HistogramWrapper extends React.Component {
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
    const unit = timeUnit(xMax);

    const errorOccurencesBuckets = getFormattedBuckets(
      errorOccurencesData.buckets,
      errorOccurencesData.bucketSize
    );

    const bucketIndex = responseTimeBuckets.findIndex(
      bucket => bucket.transactionId === this.state.transactionId
    );

    return (
      <div>
        <Histogram
          buckets={responseTimeBuckets}
          bucketSize={responseTimeData.bucketSize}
          bucketIndex={bucketIndex}
          onClick={bucket => {
            if (bucket.y > 0 && bucket.sampled) {
              this.setState({ transactionId: bucket.transactionId });
            }
          }}
          formatX={timeFormatter}
          formatYShort={value => `${value} req.`}
          formatYLong={value => `${value} requests`}
          formatTooltipHeader={(hoveredX0, hoveredX) =>
            `${timeFormatter(hoveredX0, false)} - ${timeFormatter(hoveredX)}`
          }
          verticalLineHover={bucket => bucket.y > 0 && !bucket.sampled}
          backgroundHover={bucket => bucket.y > 0 && bucket.sampled}
          tooltipHeader={bucket =>
            `${timeFormatter(bucket.x0, false)} - ${timeFormatter(
              bucket.x,
              false
            )} ${unit}`
          }
          tooltipFooter={bucket =>
            !bucket.sampled && 'No sample available for this bucket'
          }
        />

        <Histogram
          xType="time"
          buckets={errorOccurencesBuckets}
          bucketSize={errorOccurencesData.bucketSize}
          formatYShort={value => `${value} err.`}
          formatYLong={value => `${value} errors`}
          verticalLineHover={bucket => bucket.x}
        />
      </div>
    );
  }
}

storiesOf('HistogramWrapper', module).add('initial playground', () => (
  <HistogramWrapper />
));
