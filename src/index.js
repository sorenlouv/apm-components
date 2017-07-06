import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Histogram from './Histogram';

const distribution = {
  '0': 5667,
  '1867894': 2,
  '50433138': 1
};
const bucketSize = 1867894;

ReactDOM.render(
  <Histogram
    distribution={distribution}
    bucketSize={bucketSize}
    selectedBucket={10}
  />,
  document.getElementById('root')
);
