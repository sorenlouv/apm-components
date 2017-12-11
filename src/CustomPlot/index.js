import React from 'react';
import CustomPlot from './CustomPlot';
import response from './test/responseWithData.json';

import { getResponseTimeSerieOrEmpty, getRpmSeriesOrEmpty } from './selectors';

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
        responseTimeSeries: getResponseTimeSerieOrEmpty({
          chartsData: response
        }),
        rpmSeries: getRpmSeriesOrEmpty({
          chartsData: response,
          transactionType: 'requests'
        })
      });
    }, 50);
  }

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
