import React from 'react';
import styled from 'styled-components';
import { colors } from '../variables';
import Legend from './Legend';

const Container = styled.div`
  display: flex;
`;

export default function Legends() {
  return (
    <Container>
      <Legend color={colors.blue1} isDisabled size={2} text="Hello world" />
      <Legend color={colors.red} size={2} text="Hello world" />
      <Legend color={colors.teal} size={2} text="Hello world" />
    </Container>
  );
}
