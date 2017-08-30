import React, { PureComponent } from 'react';
import _ from 'lodash';
import 'react-vis/dist/style.css';
import PropTypes from 'prop-types';
import SelectionMarker from './SelectionMarker';
import { scaleLinear } from 'd3-scale';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  AreaSeries,
  MarkSeries,
  Voronoi,
  VerticalGridLines,
  makeWidthFlexible
} from 'react-vis';
import { getYMax, getYMaxRounded, getXMax, getXMin } from '../chart_utils';

const XY_HEIGHT = 300;
const XY_MARGIN = {
  top: 50,
  left: 50,
  right: 10
};
const X_TICK_TOTAL = 7;

class CustomPlot extends PureComponent {
  state = {
    isDrawing: false,
    selectionStart: null,
    selectionEnd: null
  };

  onMouseLeave = (...args) => {
    if (this.state.isDrawing) {
      this.setState({ isDrawing: false });
    }
    this.props.onMouseLeave(...args);
  };
  onMouseDown = node =>
    this.setState({
      isDrawing: true,
      selectionStart: node.x,
      selectionEnd: null
    });
  onMouseUp = () => {
    if (this.state.selectionEnd !== null) {
      this.props.onSelection({
        start: this.state.selectionStart,
        end: this.state.selectionEnd
      });
    }
    this.setState({ isDrawing: false });
  };
  onHover = node => {
    this.props.onHover(node);
    if (this.state.isDrawing) {
      this.setState({ selectionEnd: node.x });
    }
  };

  getHoveredPoints = hoveredX => {
    const index = this.props.series[0].data.findIndex(
      item => item.x === hoveredX
    );

    return this.props.series.map(serie => serie.data[index]);
  };

  render() {
    const { hoveredX, series, width, tickFormatY } = this.props;

    if (_.isEmpty(series)) {
      return null;
    }

    const defaultSerie = series[0].data;
    const allCoordinates = [].concat(...series.map(serie => serie.data));

    const xMin = getXMin(allCoordinates);
    const xMax = getXMax(allCoordinates);
    const yMin = 0;
    const yMax = getYMax(allCoordinates);
    const yMaxRounded = getYMaxRounded(yMax);
    const yTickValues = [yMaxRounded, yMaxRounded / 2];
    const XY_WIDTH = width; // from makeWidthFlexible HOC

    const x = scaleLinear()
      .domain([xMin, xMax])
      .range([XY_MARGIN.left, XY_WIDTH - XY_MARGIN.right]);
    const y = scaleLinear()
      .domain([yMin, yMaxRounded])
      .range([XY_HEIGHT, 0]);

    return (
      <XYPlot
        onMouseLeave={this.onMouseLeave}
        width={XY_WIDTH}
        height={XY_HEIGHT}
        margin={XY_MARGIN}
        xType="time"
        xDomain={x.domain()}
        yDomain={y.domain()}
      >
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis tickTotal={X_TICK_TOTAL} />
        <YAxis
          marginLeft={XY_MARGIN.left + 50}
          marginTop={XY_MARGIN.top + 10}
          tickSize={0}
          hideLine
          tickValues={yTickValues}
          tickFormat={tickFormatY}
        />

        {series.map((serie, i) => {
          switch (serie.type) {
            case 'line':
              return (
                <LineSeries
                  key={i}
                  xType="time"
                  curve={'curveMonotoneX'}
                  data={serie.data}
                  color={serie.color}
                />
              );
            case 'area':
              return (
                <AreaSeries
                  key={i}
                  xType="time"
                  curve={'curveMonotoneX'}
                  data={serie.data}
                  color={serie.color}
                />
              );
            default:
              throw new Error(`Unknown type ${serie.type}`);
          }
        })}

        {hoveredX !== null &&
        !this.state.isDrawing && (
          <MarkSeries data={this.getHoveredPoints(hoveredX)} />
        )}

        <MarkSeries
          fill="transparent"
          stroke="transparent"
          data={defaultSerie.map(point => ({ ...point, y: 0 }))}
        />

        {hoveredX !== null && <VerticalGridLines tickValues={[hoveredX]} />}

        <Voronoi
          extent={[[XY_MARGIN.left, XY_MARGIN.top], [XY_WIDTH, XY_HEIGHT]]}
          nodes={defaultSerie}
          onHover={this.onHover}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          x={d => x(d.x)}
          y={d => 0}
        />

        {this.state.isDrawing &&
        this.state.selectionEnd !== null && (
          <SelectionMarker
            start={x(this.state.selectionStart)}
            end={x(this.state.selectionEnd)}
          />
        )}
      </XYPlot>
    );
  }
}

CustomPlot.displayName = 'CustomPlot';
CustomPlot.propTypes = {
  width: PropTypes.number,
  onHover: PropTypes.func,
  onBlur: PropTypes.func
};

export default makeWidthFlexible(CustomPlot);
