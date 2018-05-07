import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReduxRequest, reduxRequestReducer } from '@sqren/redux-request';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({ reduxRequest: reduxRequestReducer });
const store = createStore(reducers);

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
          args={[1]}
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
          args={[2]}
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
