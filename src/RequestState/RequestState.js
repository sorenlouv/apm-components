import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { setStatus, subscribe, STATUS, _purge } from './onLoadingChange';
export { subscribe, STATUS, _purge };

export class RequestState extends React.Component {
  constructor(props) {
    super(props);

    this.componentId = props.id ? props.id : `component-${_.uniqueId()}`;
    this.state = {
      status: null,
      data: null,
      error: null
    };
  }

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

  componentWillUnmount() {
    this.fetchId = null;
    setStatus(this.componentId, null);
  }

  fetchData(nextProps) {
    this.setState({ status: STATUS.LOADING });
    setStatus(this.componentId, STATUS.LOADING);

    const fetchId = (this.fetchId = _.uniqueId());

    return nextProps
      .fn(...nextProps.args)
      .then(data => {
        if (fetchId === this.fetchId) {
          this.setState({ data, status: STATUS.SUCCESS });
          setStatus(this.componentId, STATUS.SUCCESS);
        }
      })
      .catch(error => {
        if (fetchId === this.fetchId) {
          this.setState({ error, status: STATUS.FAILURE });
          setStatus(this.componentId, STATUS.FAILURE);
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
