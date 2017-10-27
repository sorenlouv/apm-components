import React from 'react';
import Portal from 'react-portal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSizes } from '../variables';
import { Close } from '../Icons';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: ${fontSizes.xlarge};
`;

const CloseButton = styled(Close)`
  cursor: pointer;
  font-size: 30px;
`;

const ModalFixed = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ModalOverlay = styled(ModalFixed)`
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
`;

const ModalOuterContainer = styled(ModalFixed)`
  z-index: 20;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ModalInnerContainer = styled.div`
  position: relative;
  background: white;
  width: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  padding: 16px;
  border-radius: 4px;
`;

class Modal extends React.Component {
  shouldComponentUpdate(nextProps) {
    // TODO: Make sure this doesn't cause rendering issues
    return this.props.isOpen !== nextProps.isOpen;
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  onOpen = () => {
    document.body.style.overflow = 'hidden';
    this.props.onOpen();
  };

  onClose = () => {
    document.body.style.overflow = '';
    this.props.onClose();
  };

  close = () => this.props.close();

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <Portal
        onClose={this.onClose}
        onOpen={this.onOpen}
        closeOnEsc
        isOpened={this.props.isOpen}
      >
        <div>
          <ModalOverlay />
          <ModalOuterContainer onClick={this.close}>
            <ModalInnerContainer onClick={e => e.stopPropagation()}>
              <Header>
                <HeaderTitle>{this.props.header}</HeaderTitle>
                <CloseButton onClick={this.close} />
              </Header>
              {this.props.children}
            </ModalInnerContainer>
          </ModalOuterContainer>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  close: PropTypes.func,
  isOpen: PropTypes.bool
};

Modal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  close: () => {}
};

export default Modal;
