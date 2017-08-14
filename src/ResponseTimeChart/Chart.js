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
  MarkSeries
} from 'react-vis';
import { getYMax, getYMaxRounded, getXMax, getXMin } from '../chart_utils';

const XY_MARGIN_RIGHT = 10;
const XY_MARGIN_LEFT = 50;
const XY_MARGIN_TOP = 50;
const XY_WIDTH = 800;
const XY_HEIGHT = 300;

export default class Chart extends React.Component {
  state = {
    hoveredNode: null
  };

  getHoveredNodes() {
    const index = this.props.avg.findIndex(
      item => item.x === this.state.hoveredNode.x
    );

    return [
      this.props.avg[index],
      this.props.p95[index],
      this.props.p99[index]
    ];
  }

  render() {
    const xMax = getXMax(this.props.p99);
    const yMax = getYMax(this.props.p99);
    const yMaxRounded = getYMaxRounded(yMax);
    const yTickValues = [yMaxRounded, yMaxRounded / 2];

    const x = scaleLinear()
      .domain([0, xMax])
      .range([XY_MARGIN_LEFT, XY_WIDTH - XY_MARGIN_RIGHT]);
    const y = scaleLinear().domain([0, yMaxRounded]).range([XY_HEIGHT, 0]);

    return (
      <XYPlot
        width={XY_WIDTH}
        height={XY_HEIGHT}
        margin={{ top: XY_MARGIN_TOP, left: XY_MARGIN_LEFT }}
        xType="time"
        xDomain={x.domain()}
        yDomain={y.domain()}
      >
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis tickTotal={7} />
        <YAxis
          marginLeft={XY_MARGIN_LEFT + 50}
          marginTop={XY_MARGIN_TOP + 10}
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

        {this.state.hoveredNode !== null
          ? <MarkSeries
              data={this.getHoveredNodes()}
              xDomain={x.domain()}
              yDomain={y.domain()}
            />
          : null}
        <Voronoi
          extent={[[XY_MARGIN_LEFT, XY_MARGIN_TOP], [XY_WIDTH, XY_HEIGHT]]}
          nodes={this.props.avg.map(item => ({ ...item, y: 0 }))}
          onHover={node => this.setState({ hoveredNode: node })}
          onBlur={node => this.setState({ hoveredNode: null })}
          x={d => x(d.x)}
          y={d => y(d.y)}
        />
      </XYPlot>
    );
  }
}
