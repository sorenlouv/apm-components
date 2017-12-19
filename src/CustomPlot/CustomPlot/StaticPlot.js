import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import 'react-vis/dist/style.css';
import StatusText from './StatusText';
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  AreaSeries
} from 'react-vis';

const X_TICK_TOTAL = 7;
class StaticPlot extends PureComponent {
  getSerie(serie) {
    switch (serie.type) {
      case 'line':
        return (
          <LineSeries
            animation
            key={serie.title}
            xType="time"
            curve={'curveMonotoneX'}
            data={serie.data}
            color={serie.color}
          />
        );
      case 'area':
        return (
          <AreaSeries
            animation
            key={serie.title}
            xType="time"
            curve={'curveMonotoneX'}
            data={serie.data}
            color={serie.color}
            stroke={serie.color}
            fill={serie.areaColor}
          />
        );
      default:
        throw new Error(`Unknown type ${serie.type}`);
    }
  }

  render() {
    const { series, tickFormatX, tickFormatY, sharedPlot } = this.props;
    const { yTickValues, XYPlot } = sharedPlot;

    const filteredSeries = series
      .filter(serie => !serie.isEmpty)
      .reverse()
      .map(this.getSerie);

    return (
      <XYPlot sharedPlot={sharedPlot}>
        <HorizontalGridLines tickValues={yTickValues} />
        <XAxis tickSize={0} tickTotal={X_TICK_TOTAL} tickFormat={tickFormatX} />
        <YAxis tickSize={0} tickValues={yTickValues} tickFormat={tickFormatY} />

        {_.isEmpty(filteredSeries) ? (
          <StatusText text="No data within this time range." />
        ) : (
          filteredSeries
        )}
      </XYPlot>
    );
  }
}

export default StaticPlot;

StaticPlot.propTypes = {
  series: PropTypes.array.isRequired,
  sharedPlot: PropTypes.object.isRequired,
  tickFormatX: PropTypes.func,
  tickFormatY: PropTypes.func.isRequired
};
