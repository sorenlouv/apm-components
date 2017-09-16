import React, { PureComponent } from 'react';
import { XYPlot, MarkSeries, VerticalGridLines } from 'react-vis';

class VerticalHoverLine extends PureComponent {
  render() {
    const { width, height, margins, x, placeholderData, hoveredX } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      >
        <XYPlot
          onMouseLeave={this.onMouseLeave}
          width={width}
          height={height + margins.top}
          margin={margins}
          xDomain={x.domain()}
        >
          {hoveredX != null && (
            <VerticalGridLines
              tickValues={[hoveredX]}
              style={{ stroke: '#666' }}
            />
          )}

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

VerticalHoverLine.defaultProps = {
  onHover: () => {}
};

export default VerticalHoverLine;
