import React from 'react';
import RequestState, { STATUSES } from './RequestState';
import { mount } from 'enzyme';

describe('RequestState', () => {
  let wrapper, spy, promise;

  beforeEach(() => {
    spy = jest.fn(id => {
      promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(`Resolved ${id}`);
        }, 200);
      });
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
    await promise;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state()).toEqual({
      data: 'Resolved myInitialId',
      error: null,
      status: STATUSES.SUCCESS
    });
    wrapper.update();
    expect(wrapper.html()).toEqual(
      '<div>Status: SUCCESS; Data: Resolved myInitialId; Error: ;</div>'
    );
  });

  it('should update when args change', async () => {
    await promise;

    wrapper.setProps({ args: ['mySecondId'] });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(wrapper.state()).toEqual({
      data: 'Resolved myInitialId',
      error: null,
      status: STATUSES.LOADING
    });

    await promise;

    expect(wrapper.state()).toEqual({
      data: 'Resolved mySecondId',
      error: null,
      status: STATUSES.SUCCESS
    });
  });

  it('should not call spy again when unrelated props change', () => {
    wrapper.setProps({ randomProp: 'hello' });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
