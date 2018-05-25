import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { EuiIcon } from '@elastic/eui';

const ListItem = styled.li`
  font-size: 13px;
  height: 32px;
  align-items: center;
  display: flex;
  background: ${props => (props.selected ? '#eee' : 'initial')};
  cursor: pointer;
  border-radius: 5px;

  ${Description} {
    p span {
      background: ${props => (props.selected ? '#fff' : '#eee')};
    }
  }
`;

const Icon = styled.div`
  flex: 0 0 32px;
`;

const TextValue = styled.div`
  flex: 0 0 250px;
  color: #111;
`;

const Description = styled.div`
  color: #666;

  p {
    display: inline;

    span {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
        monospace;
      color: #000;
      padding: 0 4px;
      display: inline-block;
    }
  }
`;

function getIconType(type) {
  switch (type) {
    case 'field':
      return 'kqlField';
    case 'value':
      return 'kqlValue';
    case 'recentSearch':
      return 'search';
    case 'conjunction':
      return 'kqlSelector';
    case 'operator':
      return 'kqlOperand';
    default:
      throw new Error('Unknow type', type);
  }
}

function Suggestion(props) {
  return (
    <ListItem
      selected={props.selected}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
    >
      <Icon>{/* <EuiIcon type={getIconType(props.suggestion.type)} /> */}</Icon>
      <TextValue>{props.suggestion.text}</TextValue>
      <Description
        dangerouslySetInnerHTML={{ __html: props.suggestion.description }}
      />

      {/*  */}
    </ListItem>
  );
}

Suggestion.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  suggestion: PropTypes.object.isRequired
};

export default Suggestion;
