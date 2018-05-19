import React from 'react';
import { storiesOf } from '@storybook/react';
import { Request, reducer } from 'react-redux-request';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

function incrementer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}

const reducers = combineReducers({
  reactReduxRequest: reducer,
  incrementer
});
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
      store.dispatch({
        type: 'increment'
      });
    }, 2000);
  }

  myRender = ({ status, data, error }) => {
    console.log('render', this.state.counter);
    return (
      <div>
        <div>Status: {status}</div>
        <div>Data: {data}</div>
        <div>Error: {error}</div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.counter}
        <Request id="test2" fn={mySlowFunction} render={this.myRender} />
      </div>
    );
  }
}

storiesOf('ReduxRequest', module).add('initial playground', () => (
  <Provider store={store}>
    <ReduxRequestWrapper />
  </Provider>
));
