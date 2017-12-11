import React, { Component } from 'react';
import d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import _ from 'lodash';
import Voronoi from './Voronoi';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalRectSeries
} from 'react-vis';

const bucketSize = 10;
const buckets = [
  {
    x0: 0,
    x: 10,
    y: 3
  },
  {
    x0: 12,
    x: 22,
    y: 2
  },
  {
    x0: 24,
    x: 34,
    y: 9
  },
  {
    x0: 36,
    x: 46,
    y: 0
  },
  {
    x0: 48,
    x: 58,
    y: 2
  },
  {
    x0: 60,
    x: 70,
    y: 4
  },
  {
    x0: 72,
    x: 82,
    y: 0
  },
  {
    x0: 84,
    x: 94,
    y: 1
  }
];

const unit = 16;
const XY_HEIGHT = unit * 8;
const XY_MARGIN = {
  top: unit,
  left: unit * 5,
  right: unit,
  bottom: unit * 2
};

export class Histogram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredBucket: null
    };
  }

  onClick = bucket => {
    if (bucket.y > 0) {
      alert('clickable!');
    }
  };

  onHover = bucket => {
    this.setState({ hoveredBucket: bucket });
  };

  onBlur = () => {
    this.setState({ hoveredBucket: null });
  };

  render() {
    const XY_WIDTH = 800;
    const xMin = d3.min(buckets, d => d.x0);
    const xMax = d3.max(buckets, d => d.x);
    const yMin = 0;
    const yMax = d3.max(buckets, d => d.y) * 1.1;

    const x = scaleLinear()
      .domain([xMin, xMax])
      .range([XY_MARGIN.left, XY_WIDTH - XY_MARGIN.right]);
    const y = scaleLinear()
      .domain([yMin, yMax])
      .range([XY_HEIGHT, 0])
      .nice();

    return (
      <XYPlot
        width={XY_WIDTH}
        height={XY_HEIGHT}
        margin={XY_MARGIN}
        xDomain={x.domain()}
        yDomain={y.domain()}
      >
        <HorizontalGridLines />
        <XAxis />
        <YAxis tickSize={0} hideLine />

        {_.get(this.state.hoveredBucket, 'y') > 0 && (
          <SingleRect
            x={x(_.get(this.state.hoveredBucket, 'x0'))}
            width={x(bucketSize) - x(0)}
            style={{
              fill: '#dddddd'
            }}
          />
        )}

        <VerticalRectSeries
          colorType="literal"
          color="rgb(172, 189, 216)"
          data={buckets}
          style={{
            rx: '2px',
            ry: '2px'
          }}
        />

        <Voronoi
          extent={[[XY_MARGIN.left, XY_MARGIN.top], [XY_WIDTH, XY_HEIGHT]]}
          nodes={buckets.map(item => ({
            ...item,
            x: (item.x0 + item.x) / 2
          }))}
          cellClassName={d => (d.y > 0 ? 'clickable' : 'not-clickable')}
          onClick={this.onClick}
          onHover={this.onHover}
          onBlur={this.onBlur}
          polygonStyle={{ stroke: 'red' }}
          x={d => x(d.x)}
          y={() => 1}
        />
      </XYPlot>
    );
  }
}

export default Histogram;

function SingleRect({ innerHeight, marginTop, style, x, width }) {
  return (
    <rect
      style={style}
      height={innerHeight}
      width={width}
      rx={'2px'}
      ry={'2px'}
      x={x}
      y={marginTop}
    />
  );
}
SingleRect.requiresSVG = true;
