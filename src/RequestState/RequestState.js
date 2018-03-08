import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export const STATUSES = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export default class RequestState extends React.Component {
  state = {
    status: null,
    data: null,
    error: null
  };

  componentWillMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.didPropsChange(nextProps)) {
      this.fetchData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.didPropsChange(nextProps) || this.state !== nextState;
  }

  fetchData(nextProps) {
    this.setState({ status: STATUSES.LOADING });
    const id = (this.id = _.uniqueId());

    return nextProps
      .fn(...nextProps.args)
      .then(data => {
        if (id === this.id) {
          this.setState({ data, status: STATUSES.SUCCESS });
        }
      })
      .catch(error => {
        if (id === this.id) {
          this.setState({ error, status: STATUSES.FAILURE });
        }
      });
  }

  didPropsChange(nextProps) {
    return (
      !_.isEqual(this.props.args, nextProps.args) ||
      this.props.fn !== nextProps.fn
    );
  }

  render() {
    const { status, data, error } = this.state;
    return this.props.render({ status, data, error });
  }
}

RequestState.propTypes = {
  fn: PropTypes.func.isRequired,
  args: PropTypes.array,
  render: PropTypes.func.isRequired
};

RequestState.defaultProps = {
  args: []
};
