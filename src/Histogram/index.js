import React from 'react';
import Histogram from './Histogram';
import response from './response.json';

const buckets = getFormattedBuckets(response.buckets, response.bucketSize);

function getFormattedBuckets(buckets, bucketSize) {
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
    return (
      <Histogram
        buckets={buckets}
        bucketSize={response.bucketSize}
        transactionId={this.state.transactionId}
        onClick={selectedBucket => {
          this.setState({ transactionId: selectedBucket.transactionId });
        }}
      />
    );
  }
}
