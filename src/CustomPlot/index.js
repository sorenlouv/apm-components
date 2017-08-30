import Perf from 'react-addons-perf';
import React from 'react';
import CustomPlot from './CustomPlot';
import response from './response.json';

window.Perf = Perf;

function getResponseTimeValues(xValues, yValues) {
  return xValues.map((x, i) => ({
    x: new Date(x).getTime(),
    y: yValues[i] / 1000 // convert to ms
  }));
}

function getRpmValues(xValues, yValues) {
  return xValues.map((x, i) => ({
    x: new Date(x).getTime(),
    y: yValues[i]
  }));
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredX: null
    };
  }

  onHover = node => {
    this.setState({ hoveredX: node.x });
  };

  onMouseLeave = node => {
    this.setState({ hoveredX: null });
  };

  onSelection = selection => {
    console.log(new Date(selection.start), new Date(selection.end));
  };

  render() {
    const responseTimeSeries = [
      {
        title: '95th percentile',
        data: getResponseTimeValues(
          response.response_times.dates,
          response.response_times.p95
        ),
        type: 'area',
        color: 'rgba(26, 49, 119, 0.6)'
      },
      {
        title: '99th percentile',
        data: getResponseTimeValues(
          response.response_times.dates,
          response.response_times.p99
        ),
        type: 'area',
        color: 'rgba(121, 199, 227, 0.5)'
      },
      {
        title: 'Average',
        data: getResponseTimeValues(
          response.response_times.dates,
          response.response_times.avg
        ),
        type: 'line'
      }
    ];

    const rpmSeries = [
      {
        title: `2xx (${response.rpm_per_status_class_average['2xx']})`,
        data: getRpmValues(
          response.rpm_per_status_class.dates,
          response.rpm_per_status_class['2xx']
        ),
        type: 'line',
        color: 'red'
      },
      {
        title: '3xx',
        data: getRpmValues(
          response.rpm_per_status_class.dates,
          response.rpm_per_status_class['3xx']
        ),
        type: 'line',
        color: 'yellow'
      },
      {
        title: '4xx',
        data: getRpmValues(
          response.rpm_per_status_class.dates,
          response.rpm_per_status_class['4xx']
        ),
        type: 'line',
        color: 'green'
      },
      {
        title: '5xx',
        data: getRpmValues(
          response.rpm_per_status_class.dates,
          response.rpm_per_status_class['5xx']
        ),
        type: 'line',
        color: 'pink'
      }
    ];

    return (
      <div>
        <CustomPlot
          series={responseTimeSeries}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelection={this.onSelection}
          hoveredX={this.state.hoveredX}
          tickFormatY={t => `${t} ms`}
        />

        <CustomPlot
          series={rpmSeries}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelection={this.onSelection}
          hoveredX={this.state.hoveredX}
          tickFormatY={t => `${t} rpm`}
        />
      </div>
    );
  }
}
