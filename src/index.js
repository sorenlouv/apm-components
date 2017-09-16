/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import Histogram from './Histogram';
import PerfTest from './PerfTest';
import CustomPlot from './CustomPlot';
import Timeline from './Timeline';
import Legend from './Legend';
import './index.css';
import Perf from 'react-addons-perf';

Perf.start();
setTimeout(() => {
  Perf.stop();
  Perf.printWasted();
}, 4000);

ReactDOM.render(<Timeline />, document.getElementById('root'));
