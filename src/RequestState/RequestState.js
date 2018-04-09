import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import hash from 'object-hash/index';
import { reducer } from './reducer';
export const requestStateReducer = reducer;

export const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export class _RequestState extends React.Component {
  componentWillMount() {
    if (this.shouldFetchData(this.props)) {
      this.fetchData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.shouldFetchData(nextProps)) {
      this.fetchData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.requestState !== nextProps.requestState;
  }

  componentWillUnmount() {
    this.fetchId = null;
  }

  async fetchData(nextProps) {
    const { id, hashedArgs, onRequestStatusChange, fn, args } = nextProps;
    onRequestStatusChange({ id, hashedArgs, status: STATUS.LOADING });

    const fetchId = (this.fetchId = _.uniqueId());

    try {
      const data = await fn(...args);
      if (fetchId === this.fetchId) {
        onRequestStatusChange({ id, hashedArgs, status: STATUS.SUCCESS, data });
      }
    } catch (error) {
      if (fetchId === this.fetchId) {
        onRequestStatusChange({
          id,
          hashedArgs,
          status: STATUS.FAILURE,
          error
        });
      }
    }
  }

  // if "id" or "args"/"hashedArgs" change, fn should be invoked (to fetch data)
  shouldFetchData(nextProps) {
    return nextProps.requestState.hashedArgs !== nextProps.hashedArgs;
  }

  render() {
    const { status, data, error } = this.props.requestState;
    return this.props.render({ status, data, error });
  }
}

_RequestState.propTypes = {
  args: PropTypes.array,
  fn: PropTypes.func.isRequired,
  hashedArgs: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onRequestStatusChange: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  requestState: PropTypes.object
};

_RequestState.defaultProps = {
  args: []
};

const mapStateToProps = (state, ownProps) => {
  const hashedArgs = hash(ownProps.args);
  return {
    hashedArgs,
    requestState: state.requestState[ownProps.id] || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestStatusChange: ({ id, hashedArgs, status, data, error }) => {
      dispatch({
        data,
        error,
        hashedArgs,
        id,
        status,
        type: 'requestStatusChange'
      });
    }
  };
};

export const RequestState = connect(mapStateToProps, mapDispatchToProps)(
  _RequestState
);
