import React from 'react';
import { storiesOf } from '@storybook/react';
import { RequestState, requestStateReducer } from './RequestState';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore((state = {}, action) => {
  return {
    ...state,
    requestState: requestStateReducer(state.requestState, action)
  };
});

function mySlowFunction(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Resolved ${id}`);
    }, 1000);
  });
}

class RequestStateWrapper extends React.Component {
  state = {
    counter: 0,
    counter2: 0,
    id: 'my-id'
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({ counter: state.counter + 1 }));
    }, 2000);
  }

  render() {
    return (
      <div>
        {this.state.id}
        <RequestState
          id={this.state.id}
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

storiesOf('RequestState', module).add('initial playground', () => (
  <Provider store={store}>
    <RequestStateWrapper />
  </Provider>
));
