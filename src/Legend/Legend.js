import React from 'react';
import styled from 'styled-components';
import { units, px, colors } from '../variables';

const getSize = props => px(units.half + units.quarter * props.size);
const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: ${getSize};
  color: ${colors.gray2};
  cursor: pointer;
  opacity: ${props => (props.isDisabled ? 0.4 : 1)};
  margin-right: ${px(units.half)};
  user-select: none;

  &:last-of-type {
    margin-right: 0;
  }
`;

const Indicator = styled.span`
  width: ${getSize};
  height: ${getSize};
  margin-right: ${px(units.quarter)};
  background: ${props => props.color};
  border-radius: 100%;
`;

export default function Legend({
  color,
  text,
  size = 1,
  onClick,
  isDisabled = false
}) {
  return (
    <Container onClick={onClick} isDisabled={isDisabled} size={size}>
      <Indicator color={color} size={size} />
      <div>{text}</div>
    </Container>
  );
}
