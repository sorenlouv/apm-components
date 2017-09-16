import React, { PureComponent } from 'react';
import _ from 'lodash';
import { XYPlot, Voronoi } from 'react-vis';

const getVerticalHoverLines = _.memoize(max => {
  const STEPS = 100;
  return _.range(STEPS + 1).map(i => ({
    x: max / STEPS * i
  }));
});

class HoverArea extends PureComponent {
  onMouseLeave = () => {
    this.props.onHover(null);
  };
  onHover = p => {
    this.props.onHover(p.x);
  };
  render() {
    const { width, height, margins, x, max } = this.props;
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
          xDomain={x.domain()}
        >
          <Voronoi
            extent={[[margins.left, margins.top], [width, height]]}
            nodes={verticalHoverLines}
            onHover={this.onHover}
            x={d => x(d.x)}
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
