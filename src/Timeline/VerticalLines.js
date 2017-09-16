import React, { PureComponent } from 'react';
import { XYPlot, MarkSeries, VerticalGridLines } from 'react-vis';

export default class VerticalLines extends PureComponent {
  render() {
    const {
      width,
      height,
      margins,
      x,
      tickValues,
      placeholderData
    } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <XYPlot
          width={width}
          height={height + margins.top}
          margin={margins}
          xDomain={x.domain()}
        >
          <VerticalGridLines tickValues={tickValues} />

          <MarkSeries
            fill="transparent"
            stroke="transparent"
            data={placeholderData}
          />
        </XYPlot>
      </div>
    );
  }
}
