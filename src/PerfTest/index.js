import Perf from 'react-addons-perf';
import React from 'react';
import PerfPlot from './PerfPlot';
window.Perf = Perf;
Perf.start();

export default class extends React.Component {
  state = {
    randomNumber: null
  };

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({
        randomNumber: Math.random()
      });
    }, 100);

    setTimeout(() => {
      Perf.stop();
      Perf.printInclusive();
      Perf.printWasted();
      clearInterval(interval);
    }, 2000);
  }

  render() {
    return <PerfPlot randomNumber={this.state.randomNumber} />;
  }
}
