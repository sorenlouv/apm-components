import React from 'react';
import CustomPlot from './CustomPlot';
import response from './response.json';

export default class extends React.Component {
  state = {
    hoverIndex: null
  };

  onHover = hoverIndex => this.setState({ hoverIndex });
  onMouseLeave = () => this.setState({ hoverIndex: null });
  onSelection = selection => {
    console.log(new Date(selection.start), new Date(selection.end));
  };

  render() {
    return (
      <div>
        <CustomPlot
          series={getResponseTimeSeries(response)}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelection={this.onSelection}
          hoverIndex={this.state.hoverIndex}
          tickFormatY={t => `${t} ms`}
        />

        <CustomPlot
          series={getRpmSeries(response)}
          onHover={this.onHover}
          onMouseLeave={this.onMouseLeave}
          onSelection={this.onSelection}
          hoverIndex={this.state.hoverIndex}
          tickFormatY={t => `${t} rpm`}
        />
      </div>
    );
  }
}

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

function getResponseTimeSeries({ responseTimes }) {
  return [
    {
      title: 'Average',
      titleShort: 'Avg.',
      data: getResponseTimeValues(responseTimes.dates, responseTimes.avg),
      type: 'line',
      color: 'green'
    },
    {
      title: '95th percentile',
      titleShort: '95th',
      data: getResponseTimeValues(responseTimes.dates, responseTimes.p95),
      type: 'area',
      color: 'rgba(26, 49, 119, 0.6)'
    },
    {
      title: '99th percentile',
      titleShort: '99th',
      data: getResponseTimeValues(responseTimes.dates, responseTimes.p99),
      type: 'area',
      color: 'rgba(121, 199, 227, 0.5)'
    }
  ];
}

function getRpmSeries({ rpmPerStatusClass, rpmPerStatusClassAverage }) {
  return [
    {
      title: `2xx (${rpmPerStatusClassAverage['2xx']})`,
      titleShort: `2xx`,
      data: getRpmValues(rpmPerStatusClass.dates, rpmPerStatusClass['2xx']),
      type: 'line',
      color: 'red'
    },
    {
      title: '3xx',
      titleShort: '3xx',
      data: getRpmValues(rpmPerStatusClass.dates, rpmPerStatusClass['3xx']),
      type: 'line',
      color: 'yellow'
    },
    {
      title: '4xx',
      titleShort: '4xx',
      data: getRpmValues(rpmPerStatusClass.dates, rpmPerStatusClass['4xx']),
      type: 'line',
      color: 'green'
    },
    {
      title: '5xx',
      titleShort: '5xx',
      data: getRpmValues(rpmPerStatusClass.dates, rpmPerStatusClass['5xx']),
      type: 'line',
      color: 'pink'
    }
  ];
}
