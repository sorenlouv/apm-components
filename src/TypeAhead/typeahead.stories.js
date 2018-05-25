import React from 'react';
import { storiesOf } from '@storybook/react';
import TypeAhead from './TypeAhead';
import suggestions from './suggestions.json';

class TypeAheadExample extends React.Component {
  state = {};

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <TypeAhead
          onChange={(value, selectionStart) => {
            console.log(value, selectionStart);
          }}
          onSubmit={value => {
            console.log('Input submitted:', value);
          }}
          suggestions={suggestions.slice(4, 10)}
          onSuggestionSelected={index => {
            console.log('Suggestion selected:', index, suggestions[index]);
          }}
        />
      </div>
    );
  }
}

storiesOf('TypeAhead', module).add('initial playground', () => (
  <TypeAheadExample />
));
