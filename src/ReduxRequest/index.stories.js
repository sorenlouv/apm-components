import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReduxRequest, reduxRequestReducer } from './ReduxRequest';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore((state = {}, action) => {
  return {
    ...state,
    reduxRequest: reduxRequestReducer(state.reduxRequest, action)
  };
});

function mySlowFunction(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Resolved ${id}`);
    }, 1000);
  });
}

class ReduxRequestWrapper extends React.Component {
  state = {
    counter: 1
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({ counter: state.counter + 1 }));
    }, 2000);
  }

  render() {
    return (
      <div>
        {this.state.counter}
        <ReduxRequest
          id="test2"
          fn={mySlowFunction}
          args={[this.state.counter]}
          render={({ status, data, error }) => {
            return (
              <div>
                <div>Status: {status}</div>
                <div>Data: {data}</div>
                <div>Error: {error}</div>
              </div>
            );
          }}
        />

        <ReduxRequest
          id="test1"
          fn={mySlowFunction}
          args={[this.state.counter]}
          render={({ status, data, error }) => {
            return (
              <div>
                <div>Status: {status}</div>
                <div>Data: {data}</div>
                <div>Error: {error}</div>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

storiesOf('ReduxRequest', module).add('initial playground', () => (
  <Provider store={store}>
    <ReduxRequestWrapper />
  </Provider>
));
