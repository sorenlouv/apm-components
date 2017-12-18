import React from 'react';
import CustomPlot from './CustomPlot';
import response from './test/responseWithData.json';

import { getResponseTimeSeriesOrEmpty, getRpmSeriesOrEmpty } from './selectors';

const reduxStore = {
  responseTimeSeries: getResponseTimeSeriesOrEmpty({
    chartsData: response
  }),
  rpmSeries: getRpmSeriesOrEmpty({
    chartsData: response,
    transactionType: 'requests'
  })
};

class TwoCustomPlots extends React.Component {
  state = {
    hoverIndex: null,
    responseTimeSeries: [],
    rpmSeries: []
  };

  componentDidMount() {
    // Simulate http latency
    setTimeout(() => this.setState(reduxStore), 50);
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
          hoverIndex={this.state.hoverIndex}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelectionEnd={this.onSelectionEnd}
          series={this.state.responseTimeSeries}
          tickFormatY={this.getResponseTimeTickFormat}
        />

        <CustomPlot
          hoverIndex={this.state.hoverIndex}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelectionEnd={this.onSelectionEnd}
          series={this.state.rpmSeries}
          tickFormatY={this.getRPMTickFormat}
        />
      </div>
    );
  }
}

export default TwoCustomPlots;
