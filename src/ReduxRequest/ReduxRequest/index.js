import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReduxRequestView } from './view';
import hash from 'object-hash/index';
export { reduxRequestReducer } from './reducer';

const mapStateToProps = (state, ownProps) => {
  const { args, id, selector } = ownProps;
  const hashedArgs = hash(args);
  let result;
  try {
    result = selector(state, { id });
  } catch (e) {
    console.error(`The selector for "ReduxRequest#${id}" threw an error:\n`, e);
    return {
      hashedArgs,
      hasError: true
    };
  }

  return {
    prevHashedArgs: result.hashedArgs,
    hashedArgs,
    result
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

export const ReduxRequest = connect(mapStateToProps, mapDispatchToProps)(
  ReduxRequestView
);

ReduxRequest.propTypes = {
  args: PropTypes.array,
  id: PropTypes.string.isRequired,
  selector: PropTypes.func
};

ReduxRequest.defaultProps = {
  args: [],
  selector: (state, props) => state.reduxRequest[props.id] || {}
};
