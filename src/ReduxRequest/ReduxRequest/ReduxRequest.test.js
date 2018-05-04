import { shallow } from 'enzyme';
import React from 'react';
import { ReduxRequestView } from './view';
import { ACTION_TYPES, STATUS } from './reducer';

const resolvedPromise = (...args) => Promise.resolve(...args);

describe('ReduxRequest', () => {
  describe('When mounting with empty result', () => {
    let fnSpy, renderSpy, dispatchSpy, wrapper;

    beforeEach(() => {
      fnSpy = jest.fn(resolvedPromise);
      renderSpy = jest.fn();
      dispatchSpy = jest.fn();

      wrapper = shallow(
        <ReduxRequestView
          args={['myInitialArg']}
          dispatch={dispatchSpy}
          fn={fnSpy}
          hashedArgs="myHashedArgs"
          id="myId"
          render={renderSpy}
        />
      );
    });

    describe('initially', () => {
      it('should call fnSpy with args once', () => {
        expect(fnSpy).toHaveBeenCalledTimes(1);
        expect(fnSpy).toHaveBeenCalledWith('myInitialArg');
      });

      it('should dispatch loading and success states', () => {
        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(dispatchSpy.mock.calls).toEqual([
          [
            {
              hashedArgs: 'myHashedArgs',
              id: 'myId',
              type: ACTION_TYPES.LOADING
            }
          ],
          [
            {
              data: 'myInitialArg',
              hashedArgs: 'myHashedArgs',
              id: 'myId',
              type: ACTION_TYPES.SUCCESS
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
        fnSpy.mockReset();
        dispatchSpy.mockReset();
        renderSpy.mockReset();
        fnSpy.mockImplementation(resolvedPromise);

        wrapper.setProps({
          prevHashedArgs: 'myHashedArgs',
          result: {
            status: STATUS.SUCCESS,
            data: 'myData',
            hashedArgs: 'myHashedArgs'
          }
        });
      });

      it('should not call fnSpy again', () => {
        expect(fnSpy).not.toHaveBeenCalled();
      });

      it('should not call dispatch again', () => {
        expect(dispatchSpy).not.toHaveBeenCalled();
      });

      it('should render data', () => {
        expect(renderSpy.mock.calls).toEqual([
          [{ data: 'myData', error: undefined, status: 'SUCCESS' }]
        ]);
      });
    });
  });

  describe('When mounting with data', () => {
    let fnSpy, renderSpy, dispatchSpy, wrapper;

    beforeEach(() => {
      fnSpy = jest.fn(resolvedPromise);
      renderSpy = jest.fn();
      dispatchSpy = jest.fn();

      wrapper = shallow(
        <ReduxRequestView
          args={['myInitialArg']}
          fn={fnSpy}
          prevHashedArgs="myHashedArgs"
          hashedArgs="myHashedArgs"
          id="myId"
          dispatch={dispatchSpy}
          render={renderSpy}
          result={{
            status: STATUS.SUCCESS,
            data: 'myData'
          }}
        />
      );
    });

    describe('initially', () => {
      it('should not call fnSpy', () => {
        expect(fnSpy).not.toHaveBeenCalled();
      });

      it('should not request new data', () => {
        expect(dispatchSpy).not.toHaveBeenCalled();
      });

      it('should render SUCCESS', () => {
        expect(renderSpy.mock.calls).toEqual([
          [{ data: 'myData', error: undefined, status: 'SUCCESS' }]
        ]);
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
        expect(dispatchSpy.mock.calls).toEqual([
          [
            {
              hashedArgs: 'myHashedArgs2',
              id: 'myId',
              type: ACTION_TYPES.LOADING
            }
          ],
          [
            {
              data: 'mySecondArg',
              hashedArgs: 'myHashedArgs2',
              id: 'myId',
              type: ACTION_TYPES.SUCCESS
            }
          ]
        ]);
      });

      it('should render SUCCESS', () => {
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledWith({
          data: 'myData',
          status: STATUS.SUCCESS
        });
      });
    });
  });

  describe('shouldInvoke', () => {
    it('should not call fnSpy', () => {
      const fnSpy = jest.fn(resolvedPromise);
      shallow(
        <ReduxRequestView
          args={['myInitialArg']}
          shouldInvoke={false}
          fn={fnSpy}
          hashedArgs="myHashedArgs"
          id="myId"
          dispatch={() => {}}
        />
      );

      expect(fnSpy).not.toHaveBeenCalled();
    });
  });
});
