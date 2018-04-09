import { shallow } from 'enzyme';
import React from 'react';
import { _RequestState as RequestState, STATUS } from './RequestState';

const resolvedPromise = (...args) => Promise.resolve(...args);

describe('RequestState', () => {
  describe('When mounting with empty requestState', () => {
    let fnSpy, renderSpy, onRequestStatusChangeSpy, wrapper;

    beforeEach(() => {
      fnSpy = jest.fn(resolvedPromise);
      renderSpy = jest.fn();
      onRequestStatusChangeSpy = jest.fn();

      wrapper = shallow(
        <RequestState
          args={['myInitialArg']}
          fn={fnSpy}
          hashedArgs="myHashedArgs"
          id="myId"
          onRequestStatusChange={onRequestStatusChangeSpy}
          render={renderSpy}
          requestState={{}}
        />
      );
    });
    describe('initially', () => {
      it('should call fnSpy with args', () => {
        expect(fnSpy).toHaveBeenCalledTimes(1);
        expect(fnSpy).toHaveBeenCalledWith('myInitialArg');
      });

      it('should request new data', () => {
        expect(onRequestStatusChangeSpy).toHaveBeenCalledTimes(2);
        expect(onRequestStatusChangeSpy.mock.calls).toEqual([
          [{ hashedArgs: 'myHashedArgs', id: 'myId', status: 'LOADING' }],
          [
            {
              data: 'myInitialArg',
              hashedArgs: 'myHashedArgs',
              id: 'myId',
              status: 'SUCCESS'
            }
          ]
        ]);
      });

      it('should render undefined', () => {
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledWith({
          data: undefined,
          error: undefined,
          status: undefined
        });
      });
    });

    describe('when data has loaded', () => {
      beforeEach(() => {
        wrapper.setProps({
          requestState: {
            status: STATUS.SUCCESS,
            data: 'myData',
            hashedArgs: 'myHashedArgs'
          }
        });
      });

      it('should not call fnSpy a second time', () => {
        expect(fnSpy).toHaveBeenCalledTimes(1);
      });

      it('should not request new data a second time', () => {
        expect(onRequestStatusChangeSpy).toHaveBeenCalledTimes(2);
      });

      it('should render SUCCESS', () => {
        expect(renderSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledWith({
          data: 'myData',
          error: undefined,
          status: 'SUCCESS'
        });
      });
    });
  });

  describe('When mounting with data in requestState', () => {
    let fnSpy, renderSpy, onRequestStatusChangeSpy, wrapper;

    beforeEach(() => {
      fnSpy = jest.fn(resolvedPromise);
      renderSpy = jest.fn();
      onRequestStatusChangeSpy = jest.fn();

      wrapper = shallow(
        <RequestState
          args={['myInitialArg']}
          fn={fnSpy}
          hashedArgs="myHashedArgs"
          id="myId"
          onRequestStatusChange={onRequestStatusChangeSpy}
          render={renderSpy}
          requestState={{
            status: STATUS.SUCCESS,
            data: 'myData',
            hashedArgs: 'myHashedArgs'
          }}
        />
      );
    });

    describe('initially', () => {
      it('should not call fnSpy', () => {
        expect(fnSpy).not.toHaveBeenCalled();
      });

      it('should not request new data', () => {
        expect(onRequestStatusChangeSpy).not.toHaveBeenCalled();
      });

      it('should render SUCCESS', () => {
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledWith({
          data: 'myData',
          status: 'SUCCESS'
        });
      });
    });

    describe('when args change', () => {
      beforeEach(() => {
        wrapper.setProps({
          hashedArgs: 'myHashedArgs2',
          args: ['mySecondArg']
        });
      });

      it('should call fnSpy', () => {
        expect(fnSpy).toHaveBeenCalledWith('mySecondArg');
      });

      it('should request new data', () => {
        expect(onRequestStatusChangeSpy.mock.calls).toEqual([
          [{ hashedArgs: 'myHashedArgs2', id: 'myId', status: 'LOADING' }],
          [
            {
              data: 'mySecondArg',
              hashedArgs: 'myHashedArgs2',
              id: 'myId',
              status: 'SUCCESS'
            }
          ]
        ]);
      });

      it('should render SUCCESS', () => {
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledWith({
          data: 'myData',
          status: 'SUCCESS'
        });
      });
    });
  });
});
