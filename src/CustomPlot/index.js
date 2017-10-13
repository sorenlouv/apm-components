import React from 'react';
import CustomPlot from './CustomPlot';
import response from './test/responseWithData.json';
// import Perf from 'react-addons-perf';
import { getResponseTimeSeries, getRpmSeries, getSeries } from './selectors';

// Perf.start();
// setTimeout(() => {
//   Perf.stop();
//   Perf.printWasted();
// }, 5000);

class TwoCustomPlots extends React.Component {
  state = {
    hoverIndex: null,
    responseTimeSeries: [],
    rpmSeries: []
  };

  componentDidMount() {
    // Simulate http latency
    setTimeout(() => {
      this.setState({
        responseTimeSeries: getSeries({
          chartsData: response,
          handler: getResponseTimeSeries
        }),
        rpmSeries: getSeries({
          chartsData: response,
          handler: getRpmSeries
        })
      });
    }, 50);
  }

  // componentDidMount() {
  //   const interval = setInterval(() => {
  //     this.setState({
  //       hoverIndex: Math.floor(Math.random() * 30) + 0
  //     });
  //   }, 10);
  //   setTimeout(() => clearInterval(interval), 5000);
  // }

  onHover = hoverIndex => this.setState({ hoverIndex });
  onMouseLeave = () => this.setState({ hoverIndex: null });
  onSelectionEnd = selection => {
    console.log(new Date(selection.start), new Date(selection.end));
  };
  getResponseTimeTickFormat = t => `${response.totalHits === 0 ? '-' : t} ms`;
  getRPMTickFormat = t => `${response.totalHits === 0 ? '-' : t} rpm`;

  render() {
    return (
      <div>
        <CustomPlot
          series={this.state.responseTimeSeries}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelectionEnd={this.onSelectionEnd}
          hoverIndex={this.state.hoverIndex}
          tickFormatY={this.getResponseTimeTickFormat}
        />

        <CustomPlot
          series={this.state.rpmSeries}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelectionEnd={this.onSelectionEnd}
          hoverIndex={this.state.hoverIndex}
          tickFormatY={this.getRPMTickFormat}
        />
      </div>
    );
  }
}

export default TwoCustomPlots;
