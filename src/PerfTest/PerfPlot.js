import React, { PureComponent } from 'react';
import 'react-vis/dist/style.css';
import data from './data.json';
import { XYPlot, XAxis, LineSeries, MarkSeries } from 'react-vis';

window.props = [];
function makePure(WrappedComponent) {
  return class ChildComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
      window.props.push(nextProps);
      return true;
    }

    render() {
      window.props.push(this.props);
      return <WrappedComponent {...this.props} />;
    }
  };
}

const PureXAxis = makePure(XAxis);
const markSeries = [];

class PerfPlot extends PureComponent {
  render() {
    const { markIndex } = this.props;
    markSeries[0] = data[markIndex];
    return (
      <XYPlot width={800} height={300} xType="time">
        <PureXAxis tickTotal={10} />
        <LineSeries xType="time" curve={'curveMonotoneX'} data={data} />

        {markIndex !== null && <MarkSeries data={markSeries} />}
      </XYPlot>
    );
  }
}

export default PerfPlot;
