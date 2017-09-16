import React, { PureComponent } from 'react';
import { XYPlot, VerticalGridLines } from 'react-vis';

class VerticalHoverLine extends PureComponent {
  render() {
    const { width, height, margins, x, hoveredX } = this.props;
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
          dontCheckIfEmpty
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
        </XYPlot>
      </div>
    );
  }
}

VerticalHoverLine.defaultProps = {
  onHover: () => {}
};

export default VerticalHoverLine;
