import React from 'react';
import Chart from './Chart';
import response from './response.json';

function getCoordinates(xValues, yValues) {
  return xValues.map((x, i) => ({
    x: new Date(x).getTime(),
    y: yValues[i] / 1000 // convert to ms
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

  render() {
    const avg = getCoordinates(
      response.response_times.dates,
      response.response_times.avg
    );

    const p95 = getCoordinates(
      response.response_times.dates,
      response.response_times.p95
    );

    const p99 = getCoordinates(
      response.response_times.dates,
      response.response_times.p99
    );
    return (
      <Chart
        avg={avg}
        p95={p95}
        p99={p99}
        onHover={this.onHover}
        onMouseLeave={this.onMouseLeave}
        hoveredX={this.state.hoveredX}
      />
    );
  }
}
