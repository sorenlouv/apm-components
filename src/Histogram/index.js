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

  return buckets.map(({ count, key }, i) => {
    return {
      i,
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
      selectedBucket: 10
    };
  }

  render() {
    return (
      <Histogram
        buckets={buckets}
        bucketSize={response.bucketSize}
        selectedBucket={this.state.selectedBucket}
        onClick={selectedBucket => this.setState({ selectedBucket })}
      />
    );
  }
}
