import React from 'react';
import { storiesOf } from '@storybook/react';
import debounceRender from './index';

function HelloWorld() {
  return 'hello world';
}

const HelloWorldDebounced = debounceRender(HelloWorld);

class Demo extends React.Component {
  state = {
    hide: true,
    count: 0
  };

  timeout = (ms, hide) => {
    setTimeout(() => {
      this.setState({ hide, count: this.state.count + 1 });
    }, ms);
  };

  componentDidMount() {
    this.timeout(0, false);
    this.timeout(100, true);
    this.timeout(300, true);
    this.timeout(600, false);
    this.timeout(900, false);
    this.timeout(1100, true);
    this.timeout(1400, false);
    this.timeout(1700, true);
  }

  render() {
    return (
      <HelloWorldDebounced hide={this.state.hide} count={this.state.count} />
    );
  }
}

storiesOf('DebounceRender', module).add('initial playground', () => <Demo />);
