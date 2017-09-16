import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import 'react-vis/dist/style.css';
import { scaleLinear } from 'd3-scale';
import { makeWidthFlexible } from 'react-vis';
import VerticalHoverLine from './VerticalHoverLine';
import TimelineAxis from './TimelineAxis';
import VerticalLines from './VerticalLines';
import HoverArea from './HoverArea';

const getXScale = _.memoize(
  (xMin, xMax, margins, width) => {
    return scaleLinear()
      .domain([xMin, xMax])
      .range([margins.left, width - margins.right]);
  },
  (xMin, xMax, margins, width) =>
    [xMin, xMax, margins.left, margins.right, width].join('__')
);

const getTicks = _.memoize(xScale => xScale.ticks(7));

class Timeline extends Component {
  state = {
    hoveredX: null
  };

  onHover = hoveredX => this.setState({ hoveredX });

  render() {
    const { width, height, margins, max } = this.props;
    const { hoveredX } = this.state;

    if (max == null || !width) {
      return null;
    }

    const xMin = 0;
    const xMax = max;
    const x = getXScale(xMin, xMax, margins, width);
    const tickValues = getTicks(x);

    return (
      <div>
        <TimelineAxis
          width={width}
          margins={margins}
          x={x}
          tickValues={tickValues}
          hoveredX={hoveredX}
        />

        <VerticalLines
          width={width}
          height={height}
          margins={margins}
          x={x}
          tickValues={tickValues}
        />

        <VerticalHoverLine
          width={width}
          height={height}
          margins={margins}
          x={x}
          max={max}
          hoveredX={hoveredX}
        />

        <HoverArea
          width={width}
          height={height}
          margins={margins}
          x={x}
          max={max}
          onHover={this.onHover}
        />
      </div>
    );
  }
}

Timeline.propTypes = {
  width: PropTypes.number
};

export default makeWidthFlexible(Timeline);
