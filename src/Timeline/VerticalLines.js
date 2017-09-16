import React, { PureComponent } from 'react';
import { XYPlot, VerticalGridLines } from 'react-vis';

export default class VerticalLines extends PureComponent {
  render() {
    const { width, height, margins, x, tickValues } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <XYPlot
          dontCheckIfEmpty
          width={width}
          height={height + margins.top}
          margin={margins}
          xDomain={x.domain()}
        >
          <VerticalGridLines tickValues={tickValues} />
        </XYPlot>
      </div>
    );
  }
}
