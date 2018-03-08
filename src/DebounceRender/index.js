import React from 'react';

export default function debounceRender(
  WrappedComponent,
  minimumDuration = 1000
) {
  return class DebouncedContainer extends React.Component {
    lastRenderedTime = 0;
    shouldRender = false;

    state = {
      hide: true
    };

    componentWillReceiveProps({ hide }) {
      clearTimeout(this.timeout);

      const visibleDuration = Date.now() - this.lastRenderedTime;
      const timeRemaining = minimumDuration - visibleDuration;
      if (hide && timeRemaining > 0) {
        this.shouldRender = false;
        this.setStateDelayed(timeRemaining);
      } else {
        this.shouldRender = true;
        this.lastRenderedTime = Date.now();
        this.setState({ hide });
      }
    }

    setStateDelayed = timeRemaining => {
      this.timeout = setTimeout(() => {
        this.shouldRender = true;
        this.setState({ hide: true });
      }, timeRemaining);
    };

    shouldComponentUpdate() {
      return this.shouldRender;
    }

    render() {
      if (this.state.hide) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}
