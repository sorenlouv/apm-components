import React from 'react';
import styled from 'styled-components';

const Indicator = styled.span`
  display: inline-block;
  background: ${props => props.color};
  border-radius: 5px;
  width: 11px;
  height: 11px;
  margin-right: 5px;
`;

export function Legend({ serie, i, isDisabled, onClick }) {
  return (
    <div onClick={() => onClick(i)}>
      <Indicator color={serie.color} />
      {serie.title}
    </div>
  );
}
