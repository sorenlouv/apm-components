import React from 'react';
import { storiesOf } from '@storybook/react';
import RequestState from './RequestState';

function mySlowFunction(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Resolved ${id}`);
    }, 200);
  });
}

class RequestStateWrapper extends React.Component {
  state = {
    id: 0
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ id: this.state.id + 1 });
    }, 10000);

    setInterval(() => {
      this.setState({ id2: this.state.id + 1 });
    }, 1000);
  }

  render() {
    return (
      <RequestState
        fn={mySlowFunction}
        args={[this.state.id]}
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
    );
  }
}

storiesOf('RequestState', module).add('initial playground', () => (
  <RequestStateWrapper />
));
