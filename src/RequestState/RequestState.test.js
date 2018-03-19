import React from 'react';
import RequestState, { STATUSES } from './RequestState';
import { mount } from 'enzyme';

jest.useFakeTimers();

function delay(ms, ...args) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Resolved in ${ms}ms with [${args}]`);
    }, ms);
  });
}

describe('RequestState', () => {
  let wrapper, spy, promise;

  beforeEach(() => {
    spy = jest.fn((...args) => {
      promise = delay(2000, ...args);
      return promise;
    });

    wrapper = mount(
      <RequestState
        fn={spy}
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

  it('should have initial state and markup', () => {
    expect(spy).toHaveBeenCalledWith('myInitialId');

    expect(wrapper.state()).toEqual({
      data: null,
      error: null,
      status: STATUSES.LOADING
    });

    expect(wrapper.html()).toEqual(
      '<div>Status: LOADING; Data: ; Error: ;</div>'
    );
  });

  it('should have data when promise fn resolves', async () => {
    jest.runAllTimers();
    await promise;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state()).toEqual({
      data: 'Resolved in 2000ms with [myInitialId]',
      error: null,
      status: STATUSES.SUCCESS
    });
    wrapper.update();
    expect(wrapper.html()).toEqual(
      '<div>Status: SUCCESS; Data: Resolved in 2000ms with [myInitialId]; Error: ;</div>'
    );
  });

  it('should update when args change', async () => {
    jest.runAllTimers();
    await promise;

    wrapper.setProps({ args: ['mySecondId'] });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(wrapper.state()).toEqual({
      data: 'Resolved in 2000ms with [myInitialId]',
      error: null,
      status: STATUSES.LOADING
    });

    jest.runAllTimers();
    await promise;

    expect(wrapper.state()).toEqual({
      data: 'Resolved in 2000ms with [mySecondId]',
      error: null,
      status: STATUSES.SUCCESS
    });
  });

  it('should render last changed prop - not last resolved prop ', async () => {
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

    expect(wrapper.state()).toEqual({
      data: 'Resolved in 100ms with [myThirdId]',
      error: null,
      status: STATUSES.SUCCESS
    });
  });

  it('should not call spy again when unrelated props change', () => {
    wrapper.setProps({ randomProp: 'hello' });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
