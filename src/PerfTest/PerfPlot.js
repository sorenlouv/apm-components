import React, { PureComponent } from 'react';
import { makePure } from './utils';

import 'react-vis/dist/style.css';
import data from './data.json';
import { XYPlot, XAxis, LineSeries, MarkSeries } from 'react-vis';

const PureXAxis = makePure(
  XAxis,
  (props, nextProps) => props.tickTotal !== nextProps.tickTotal
);

const PureLineSeries = makePure(
  LineSeries,
  (props, nextProps) => props.data !== nextProps.data
);

const markSeries = [];

class PerfPlot extends PureComponent {
  render() {
    const { markIndex } = this.props;
    markSeries[0] = data[markIndex];
    return (
      <XYPlot width={800} height={300} xType="time">
        <XAxis tickTotal={10} />
        <LineSeries xType="time" curve={'curveMonotoneX'} data={data} />

        {markIndex !== null && <MarkSeries data={[data[markIndex]]} />}
      </XYPlot>
    );
  }
}

export default PerfPlot;
