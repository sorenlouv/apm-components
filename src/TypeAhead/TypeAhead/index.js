import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Suggestions from './Suggestions';

const KEY_CODES = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  ESC: 27
};

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  outline: none;
`;

export default class Typeahead extends React.Component {
  state = {
    isSuggestionsVisible: false,
    index: null,
    value: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.suggestions !== this.props.suggestions) {
      this.setState({ isSuggestionsVisible: true, index: null });
    }
  }

  onBlurInput = () => {
    // hack to avoid removing suggestions before they are clicked
    setTimeout(() => {
      this.setState({ isSuggestionsVisible: false });
    }, 50);
  };

  incrementIndex = currentIndex => {
    let nextIndex = currentIndex + 1;
    if (currentIndex === null || nextIndex >= this.props.suggestions.length) {
      nextIndex = 0;
    }
    this.setState({ index: nextIndex });
  };

  decrementIndex = currentIndex => {
    let previousIndex = currentIndex - 1;
    if (currentIndex === null || previousIndex < 0) {
      previousIndex = this.props.suggestions.length - 1;
    }
    this.setState({ index: previousIndex });
  };

  onKeyUp = event => {
    const { selectionStart } = event.target;
    const { value } = this.state;
    switch (event.keyCode) {
      case KEY_CODES.LEFT:
        this.setState({ isSuggestionsVisible: true });
        this.props.onChange(value, selectionStart);
        break;
      case KEY_CODES.RIGHT:
        this.setState({ isSuggestionsVisible: true });
        this.props.onChange(value, selectionStart);
        break;
    }
  };

  onKeyDown = event => {
    const { isSuggestionsVisible, index, value } = this.state;
    switch (event.keyCode) {
      case KEY_CODES.DOWN:
        event.preventDefault();
        if (isSuggestionsVisible) {
          this.incrementIndex(index);
        } else {
          this.setState({ isSuggestionsVisible: true, index: 0 });
        }
        break;
      case KEY_CODES.UP:
        event.preventDefault();
        if (isSuggestionsVisible) {
          this.decrementIndex(index);
        }
        break;
      case KEY_CODES.ENTER:
        event.preventDefault();
        if (isSuggestionsVisible && index !== null) {
          this.props.onSuggestionSelected(index);
        } else {
          this.props.onSubmit(value);
        }
        this.setState({ isSuggestionsVisible: false });
        break;
      case KEY_CODES.ESC:
        event.preventDefault();
        this.setState({ isSuggestionsVisible: false });
        break;
    }
  };

  onChangeInput = event => {
    const { value, selectionStart } = event.target;
    this.setState({ value });
    this.props.onChange(value, selectionStart);
  };

  onClickInput = () => {
    this.setState({ isSuggestionsVisible: true });
  };

  onClickSuggestion = index => {
    this.inputRef.focus();
    this.setState({ index, isSuggestionsVisible: false });
    this.props.onSuggestionSelected(index);
  };

  onMouseOverSuggestion = index => {
    this.setState({ index });
  };

  render() {
    return (
      <div>
        <Input
          innerRef={node => (this.inputRef = node)}
          type="text"
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onChange={this.onChangeInput}
          onClick={this.onClickInput}
          onBlur={this.onBlurInput}
        />
        <Suggestions
          show={this.state.isSuggestionsVisible}
          //   show
          suggestions={this.props.suggestions}
          index={this.state.index}
          onClick={this.onClickSuggestion}
          onMouseOver={this.onMouseOverSuggestion}
        />
      </div>
    );
  }
}

Typeahead.propTypes = {
  onSubmit: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  suggestions: PropTypes.array.isRequired
};

Typeahead.defaultProps = {
  onSuggestionSelected: () => {},
  suggestions: []
};
