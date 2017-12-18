import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import 'react-vis/dist/style.css';
import { makeWidthFlexible } from 'react-vis';
import { createSelector } from 'reselect';
import getSharedPlot from './getSharedPlot';
import TimelineAxis from './TimelineAxis';
import VerticalLines from './VerticalLines';

class Timeline extends PureComponent {
  getSharedPlot = createSelector(
    state => state.duration,
    state => state.height,
    state => state.margins,
    state => state.width,
    getSharedPlot
  );

  render() {
    const { width, duration, header } = this.props;

    if (duration == null || !width) {
      return null;
    }

    const sharedPlot = this.getSharedPlot(this.props);

    return (
      <div>
        <TimelineAxis sharedPlot={sharedPlot} header={header} />
        <VerticalLines sharedPlot={sharedPlot} />
      </div>
    );
  }
}

Timeline.propTypes = {
  duration: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  header: PropTypes.node,
  margins: PropTypes.object.isRequired,
  width: PropTypes.number
};

export default makeWidthFlexible(Timeline);
