import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-router';
import React from 'react';

import './storybook.css';

const requireStory = require.context(`../src`, true, /\.stories\.js$/);

function loadStories() {
  requireStory.keys().forEach(filename => {
    return requireStory(filename);
  });
}

addDecorator(StoryRouter());

configure(loadStories, module);
