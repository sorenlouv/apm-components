import React from 'react';
import { storiesOf } from '@storybook/react';
import { colors } from '../variables';
import Legend from './Legend';

storiesOf('Legend', module).add('initial playground', () => (
  <div style={{ display: 'flex' }}>
    <Legend color={colors.blue1} isDisabled size={2} text="Hello world" />
    <Legend color={colors.red} size={2} text="Hello world" />
    <Legend color={colors.teal} size={2} text="Hello world" />
  </div>
));
