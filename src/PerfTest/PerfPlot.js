import React, { PureComponent } from 'react';
import 'react-vis/dist/style.css';
import data from './data.json';
import { XYPlot, XAxis, LineSeries } from 'react-vis';

window.props = [];
function makePure(WrappedComponent) {
  return class ChildComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
      window.props.push(nextProps);
      return true;
    }

    render() {
      window.props.push(this.props);
      console.log('Wrapped component was rendered');
      return <WrappedComponent {...this.props} />;
    }
  };
}

const PureXAxis = makePure(XAxis);

const XY_WIDTH = 800;
const XY_HEIGHT = 300;
const XY_MARGIN = {
  top: 50,
  left: 50,
  right: 10
};
const X_TICK_TOTAL = 7;

class PerfPlot extends PureComponent {
  render() {
    return (
      <XYPlot
        width={XY_WIDTH}
        height={XY_HEIGHT}
        margin={XY_MARGIN}
        xType="time"
      >
        <PureXAxis tickTotal={X_TICK_TOTAL} />
        <LineSeries xType="time" curve={'curveMonotoneX'} data={data} />
      </XYPlot>
    );
  }
}

export default PerfPlot;
