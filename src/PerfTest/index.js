import React, { Component } from 'react';
import Perf from 'react-addons-perf';
import { XYPlot, XAxis, LineSeries, MarkSeries } from 'react-vis';
import 'react-vis/dist/style.css';

const data = [
  { x: 1502282820000, y: 0 },
  { x: 1502282880000, y: 480.07448979591834 },
  { x: 1502282940000, y: 210.27743589743585 },
  { x: 1502283000000, y: 437.2161836734694 },
  { x: 1502283060000, y: 178.02835999999996 },
  { x: 1502283120000, y: 462.68808163265305 }
];
window.Perf = Perf;
Perf.start();

const markSeries = [];
export default class PerfTest extends Component {
  state = {
    markIndex: null
  };

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({
        markIndex: Math.floor(Math.random() * data.length)
      });
    }, 100);

    setTimeout(() => {
      printPerfResults();
      clearInterval(interval);
    }, 5000);
  }

  render() {
    const { markIndex } = this.state;
    markSeries[0] = data[markIndex];
    return (
      <XYPlot width={800} height={300} xType="time">
        <XAxis tickTotal={10} />
        <LineSeries xType="time" curve={'curveMonotoneX'} data={data} />

        {markIndex !== null && <MarkSeries data={markSeries} />}
      </XYPlot>
    );
  }
}

function printPerfResults() {
  Perf.stop();
  Perf.printInclusive();
  Perf.printWasted();
  const totalWastedRenders = Perf.getWasted().reduce(
    (total, v) => total + v.renderCount,
    0
  );
  const totalWastedTime = Perf.getWasted().reduce(
    (total, v) => total + v.inclusiveRenderDuration,
    0
  );
  const totalRenderTime = Perf.getInclusive().find(v => v.key === 'PerfTest')
    .inclusiveRenderDuration;
  console.log('Render time:', Math.round(totalRenderTime), 'ms');
  console.log('Wasted time:', Math.round(totalWastedTime), 'ms');
  console.log('Wasted renders:', totalWastedRenders);
}
