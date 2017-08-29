import Perf from 'react-addons-perf';
import React from 'react';
import PerfPlot from './PerfPlot';
window.Perf = Perf;
Perf.start();

export default class extends React.Component {
  state = {
    markIndex: null
  };

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({
        markIndex: Math.floor(Math.random() * 20) + 1
      });
    }, 100);

    setTimeout(() => {
      Perf.stop();
      Perf.printInclusive();
      Perf.printWasted();
      console.log(
        'XAxis > Axis',
        Perf.getInclusive().find(item => item.key === 'XAxis > Axis')
          .renderCount
      );
      clearInterval(interval);
    }, 2000);
  }

  render() {
    return <PerfPlot markIndex={this.state.markIndex} />;
  }
}
