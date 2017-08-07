import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import Histogram from './Histogram';
import response from './response.json';

const graphItems = getGraphItems(response.distribution, response.bucketSize);

function getGraphItems(distribution, bucketSize) {
  function getYMax(distribution) {
    return Math.max(...Object.values(distribution).map(item => item.count));
  }
  const yMax = getYMax(distribution);

  return _.map(distribution, ({ count }, key) => {
    const bucket = parseInt(key, 10);
    return {
      x0: bucket,
      x: bucket + bucketSize,
      y: count > 0 ? Math.max(count, yMax * 0.1) : 0
    };
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBucket: 10
    };
  }

  render() {
    return (
      <Histogram
        graphItems={graphItems}
        bucketSize={response.bucketSize}
        selectedBucket={this.state.selectedBucket}
        onClick={selectedBucket => this.setState({ selectedBucket })}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
