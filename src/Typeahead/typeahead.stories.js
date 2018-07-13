import React from 'react';
import { storiesOf } from '@storybook/react';
import Typeahead from './Typeahead';
import suggestions from './suggestions.json';

class TypeaheadExample extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <Typeahead
          initialValue="test"
          onChange={(value, selectionStart) => {
            console.log(value, selectionStart);
          }}
          onSubmit={value => {
            console.log('Input submitted:', value);
          }}
          suggestions={suggestions.slice(4, 10)}
        />
      </div>
    );
  }
}

storiesOf('Typeahead', module).add('initial playground', () => (
  <TypeaheadExample />
));
