import React, { PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';
import { XYPlot, XAxis } from 'react-vis';

export default class EmptyPlot extends PureComponent {
  render() {
    const width = 600;
    const height = 300;
    const margins = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

    const x = scaleLinear()
      .domain([0, 10])
      .range([0, 10]);

    return (
      <XYPlot
        dontCheckIfEmpty
        width={width}
        height={height}
        margin={margins}
        xDomain={x.domain()}
      >
        <XAxis />
      </XYPlot>
    );
  }
}
