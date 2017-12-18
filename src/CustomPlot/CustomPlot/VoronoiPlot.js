import React, { PureComponent } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import 'react-vis/dist/style.css';
import { Voronoi } from 'react-vis';

class VoronoiPlot extends PureComponent {
  render() {
    const { series, sharedPlot } = this.props;
    const { XYPlot, XY_MARGIN, XY_HEIGHT, XY_WIDTH, x } = sharedPlot;
    const defaultSerie = _.get(series, '[0]');
    const defaultSerieData = _.get(defaultSerie, 'data');
    if (!defaultSerieData || defaultSerie.isEmpty) {
      return null;
    }

    return (
      <XYPlot onMouseLeave={this.props.onMouseLeave}>
        <Voronoi
          extent={[[XY_MARGIN.left, XY_MARGIN.top], [XY_WIDTH, XY_HEIGHT]]}
          nodes={defaultSerieData}
          onHover={this.props.onHover}
          onMouseDown={this.props.onMouseDown}
          onMouseUp={this.props.onMouseUp}
          x={d => x(d.x)}
          y={() => 0}
        />
      </XYPlot>
    );
  }
}

export default VoronoiPlot;

VoronoiPlot.propTypes = {
  onHover: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  series: PropTypes.array.isRequired,
  sharedPlot: PropTypes.object.isRequired
};
