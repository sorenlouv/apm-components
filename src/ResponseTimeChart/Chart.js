import React from 'react';
import 'react-vis/dist/style.css';

import { scaleLinear } from 'd3-scale';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  AreaSeries,
  Voronoi,
  MarkSeries,
  VerticalGridLines
} from 'react-vis';
import { getYMax, getYMaxRounded, getXMax, getXMin } from '../chart_utils';

const XY_WIDTH = 800;
const XY_HEIGHT = 300;
const XY_MARGIN = {
  top: 50,
  left: 50,
  right: 10
};

export default class Chart extends React.Component {
  state = {
    hoveredX: null
  };

  getHoveredPoints(hoveredX) {
    const index = this.props.avg.findIndex(item => item.x === hoveredX);

    return [
      this.props.avg[index],
      this.props.p95[index],
      this.props.p99[index]
    ];
  }

  onHover = node => {
    this.setState({ hoveredX: node.x });
  };

  onBlur = node => {
    this.setState({ hoveredX: null });
  };

  render() {
    const xMin = getXMin(this.props.p99);
    const xMax = getXMax(this.props.p99);
    const yMin = 0;
    const yMax = getYMax(this.props.p99);
    const yMaxRounded = getYMaxRounded(yMax);
    const yTickValues = [yMaxRounded, yMaxRounded / 2];

    const x = scaleLinear()
      .domain([xMin, xMax])
      .range([XY_MARGIN.left, XY_WIDTH - XY_MARGIN.right]);
    const y = scaleLinear().domain([yMin, yMaxRounded]).range([XY_HEIGHT, 0]);

    return (
      <XYPlot
        width={XY_WIDTH}
        height={XY_HEIGHT}
        margin={XY_MARGIN}
        xType="time"
        xDomain={x.domain()}
        yDomain={y.domain()}
      >
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis tickTotal={7} />
        <YAxis
          marginLeft={XY_MARGIN.left + 50}
          marginTop={XY_MARGIN.top + 10}
          tickSize={0}
          hideLine
          tickValues={yTickValues}
          tickFormat={t => `${t} ms`}
        />
        <AreaSeries
          curve={'curveMonotoneX'}
          data={this.props.p95}
          color="rgba(26, 49, 119, 0.6)"
        />
        <AreaSeries
          xType="time"
          curve={'curveMonotoneX'}
          data={this.props.p99}
          color="rgba(121, 199, 227, 0.5)"
        />
        <LineSeries
          xType="time"
          curve={'curveMonotoneX'}
          data={this.props.avg}
        />

        {this.state.hoveredX !== null
          ? <MarkSeries
              data={this.getHoveredPoints(this.state.hoveredX)}
              xDomain={x.domain()}
              yDomain={y.domain()}
            />
          : null}

        {this.state.hoveredX
          ? <VerticalGridLines tickValues={[this.state.hoveredX]} />
          : null}

        <Voronoi
          extent={[[XY_MARGIN.left, XY_MARGIN.top], [XY_WIDTH, XY_HEIGHT]]}
          nodes={this.props.avg.map(item => ({ ...item, y: 0 }))}
          onHover={this.onHover}
          onBlur={this.onBlur}
          x={d => x(d.x)}
          y={d => y(d.y)}
        />
      </XYPlot>
    );
  }
}
