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

const getPlaceholderData = _.memoize(xMax => {
  return [0, xMax].map(x => ({ x, y: 0 }));
});

const getXScale = _.memoize(
  (xMin, xMax, margins, width) => {
    return scaleLinear()
      .domain([xMin, xMax])
      .range([margins.left, width - margins.right]);
  },
  (xMin, xMax, margins, width) => {
    [xMin, xMax, margins.left, margins.rigt, width].join('__');
  }
);

const getTicks = _.memoize(x => x.ticks(7));

class Timeline extends Component {
  state = {
    hoveredX: null
  };

  onHover = hoveredX => this.setState({ hoveredX });

  componentDidMount() {
    // const interval = setInterval(() => {
    //   this.setState({
    //     hoveredX: Math.floor(Math.random() * 50000) + 1
    //   });
    // }, 10);
    // setTimeout(() => clearInterval(interval), 4000);
  }

  render() {
    const { width, height, margins, max } = this.props;
    const { hoveredX } = this.state;

    if (max == null || !width) {
      return null;
    }

    const xMin = 0;
    const xMax = max;
    const placeholderData = getPlaceholderData(xMax);
    const x = getXScale(xMin, xMax, margins, width);
    const tickValues = getTicks(x);

    return (
      <div>
        <TimelineAxis
          width={width}
          margins={margins}
          x={x}
          tickValues={tickValues}
          placeholderData={placeholderData}
          hoveredX={hoveredX}
        />

        <VerticalLines
          width={width}
          height={height}
          margins={margins}
          x={x}
          tickValues={tickValues}
          placeholderData={placeholderData}
        />

        <VerticalHoverLine
          width={width}
          height={height}
          margins={margins}
          x={x}
          max={max}
          hoveredX={hoveredX}
          placeholderData={placeholderData}
        />

        <HoverArea
          width={width}
          height={height}
          margins={margins}
          x={x}
          max={max}
          placeholderData={placeholderData}
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
