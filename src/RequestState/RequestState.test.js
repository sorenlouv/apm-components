import React from 'react';
import { RequestState, STATUS, subscribe, _purge } from './RequestState';
import { shallow } from 'enzyme';

jest.useFakeTimers();

function delay(ms, ...args) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Resolved in ${ms}ms with [${args}]`);
    }, ms);
  });
}

describe('RequestState', () => {
  beforeEach(_purge);

  describe('When rendering one instance', () => {
    let wrapper, fnSpy, subscribeSpy, promise;

    beforeEach(() => {
      fnSpy = jest.fn((...args) => {
        promise = delay(5000, ...args);
        return promise;
      });

      subscribeSpy = jest.fn();
      subscribe(subscribeSpy);

      wrapper = shallow(
        <RequestState
          fn={fnSpy}
          args={['myInitialId']}
          render={({ status, data, error }) => {
            return (
              <div>
                Status: {status}; Data: {data}; Error: {error};
              </div>
            );
          }}
        />
      );
    });

    describe('initially', () => {
      it('should have initial state and markup', () => {
        expect(fnSpy).toHaveBeenCalledWith('myInitialId');

        expect(wrapper.state()).toEqual({
          data: null,
          error: null,
          status: STATUS.LOADING
        });

        expect(wrapper.html()).toEqual(
          '<div>Status: LOADING; Data: ; Error: ;</div>'
        );
      });

      it('should call subscribe', () => {
        expect(subscribeSpy.mock.calls).toEqual([[true]]);
      });
    });

    describe('after promise has resolved', () => {
      beforeEach(async () => {
        jest.runAllTimers();
        await promise;
        wrapper.update();
      });

      it('should have correct state', async () => {
        expect(fnSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.state()).toEqual({
          data: 'Resolved in 5000ms with [myInitialId]',
          error: null,
          status: STATUS.SUCCESS
        });
      });

      it('should have correct markup', () => {
        expect(wrapper.html()).toEqual(
          '<div>Status: SUCCESS; Data: Resolved in 5000ms with [myInitialId]; Error: ;</div>'
        );
      });

      it('should call subscribe', () => {
        expect(subscribeSpy.mock.calls).toEqual([[true], [false]]);
      });
    });

    describe('when props change', () => {
      beforeEach(() => {
        wrapper.setProps({ args: ['mySecondId'] });
      });

      it('should call spy again', () => {
        expect(fnSpy).toHaveBeenCalledTimes(2);
        expect(wrapper.state()).toEqual({
          data: null,
          error: null,
          status: STATUS.LOADING
        });
      });

      it('should update state after second promise resolves', async () => {
        jest.runAllTimers();
        await promise;

        expect(wrapper.state()).toEqual({
          data: 'Resolved in 5000ms with [mySecondId]',
          error: null,
          status: STATUS.SUCCESS
        });
      });
    });

    describe('when two request are racing', () => {
      it('should render the prop that was initiated last', async () => {
        let shortPromise;

        wrapper.setProps({
          args: ['myThirdId'],
          fn: (...args) => {
            shortPromise = delay(100, args);
            return shortPromise;
          }
        });

        jest.runAllTimers();
        await promise, shortPromise;

        expect(fnSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.state()).toEqual({
          data: 'Resolved in 100ms with [myThirdId]',
          error: null,
          status: STATUS.SUCCESS
        });
      });
    });

    it('should not call fn again when unrelated props change', () => {
      wrapper.setProps({ unrelatedProp: 'hello' });
      expect(fnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when rendering two instances', () => {
    it('should call subscribe', async () => {
      const subscribeSpy = jest.fn();
      subscribe(subscribeSpy);

      const fn = async () => {};
      const wrapper = shallow(<RequestState fn={fn} render={() => {}} />);
      const wrapper2 = shallow(<RequestState fn={fn} render={() => {}} />);

      await fn;
      expect(subscribeSpy.mock.calls).toEqual([
        [true],
        [true],
        [true],
        [false]
      ]);

      wrapper.setProps({
        args: ['myArg']
      });

      wrapper2.setProps({
        args: ['myArg2']
      });

      await fn;
      expect(subscribeSpy.mock.calls).toEqual([
        [true],
        [true],
        [true],
        [false],
        [true],
        [true],
        [true],
        [false]
      ]);
    });
  });
});
