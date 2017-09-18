import React, { PureComponent } from 'react';
import _ from 'lodash';
import { scaleLinear } from 'd3-scale';
import { XYPlot, Voronoi } from 'react-vis';

const getVerticalHoverLines = _.memoize(max => {
  return scaleLinear()
    .domain([0, max])
    .nice()
    .ticks(100)
    .filter(x => x <= max)
    .map(x => ({ x }));
});

class HoverArea extends PureComponent {
  onMouseLeave = () => {
    this.props.onHover(null);
  };
  onHover = p => {
    this.props.onHover(p.x);
  };
  render() {
    const { width, height, margins, xScale, xDomain, max } = this.props;
    const verticalHoverLines = getVerticalHoverLines(max);

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
          xDomain={xDomain}
        >
          <Voronoi
            extent={[[margins.left, margins.top], [width, height]]}
            nodes={verticalHoverLines}
            onHover={this.onHover}
            x={d => xScale(d.x)}
            y={() => 0}
          />
        </XYPlot>
      </div>
    );
  }
}

HoverArea.defaultProps = {
  onHover: () => {}
};

export default HoverArea;
