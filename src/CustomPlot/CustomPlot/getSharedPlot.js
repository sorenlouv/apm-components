import { XYPlot } from 'react-vis';
import React from 'react';
import d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import { unit } from '../../variables';

const XY_HEIGHT = unit * 16;
const XY_MARGIN = {
  top: unit,
  left: unit * 5,
  right: unit,
  bottom: unit * 2
};

const getXScale = (xMin, xMax, width) => {
  return scaleLinear()
    .domain([xMin, xMax])
    .range([XY_MARGIN.left, width - XY_MARGIN.right]);
};

const getYScale = (yMin, yMax) => {
  return scaleLinear()
    .domain([yMin, yMax])
    .range([XY_HEIGHT, 0])
    .nice();
};

const getXYPlot = (xScale, yScale, width) => {
  function XYPlotWrapper(props) {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <XYPlot
          dontCheckIfEmpty
          width={width}
          height={XY_HEIGHT}
          margin={XY_MARGIN}
          xType="time"
          xDomain={xScale.domain()}
          yDomain={yScale.domain()}
          {...props}
        />
      </div>
    );
  }

  return XYPlotWrapper;
};

export default function getSharedPlot(series, width) {
  const allCoordinates = _.flatten(series.map(serie => serie.data));
  const xMin = d3.min(allCoordinates, d => d.x);
  const xMax = d3.max(allCoordinates, d => d.x);
  const yMin = 0;
  const yMax = d3.max(allCoordinates, d => d.y) || 1;
  const xScale = getXScale(xMin, xMax, width);
  const yScale = getYScale(yMin, yMax);

  const yMaxNice = yScale.domain()[1];
  const yTickValues = [0, yMaxNice / 2, yMaxNice];

  return {
    x: xScale,
    y: yScale,
    yTickValues,
    XYPlot: getXYPlot(xScale, yScale, width),
    XY_MARGIN,
    XY_HEIGHT,
    XY_WIDTH: width
  };
}
