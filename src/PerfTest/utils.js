import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

export function makePure(WrappedComponent, shouldComponentUpdate) {
  class PureChild extends Component {
    shouldComponentUpdate(nextProps) {
      return shouldComponentUpdate(this.props, nextProps);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  hoistNonReactStatic(PureChild, WrappedComponent);
  return PureChild;
}
