import { setStatus, subscribe, STATUS } from './onLoadingChange';

describe('onLoadingChange', () => {
  describe('when a component is loading', () => {
    it('should be true', () => {
      const spy = jest.fn();
      subscribe(spy);
      setStatus('component1', STATUS.LOADING);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(true);
    });
  });

  describe('when a component finishes loading', () => {
    it('should be false', () => {
      const spy = jest.fn();
      subscribe(spy);
      setStatus('component1', STATUS.LOADING);
      setStatus('component1', STATUS.SUCCESS);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith(false);
    });
  });

  describe('when two components are loading and one finishes', () => {
    it('should be true', () => {
      const spy = jest.fn();
      subscribe(spy);
      setStatus('component1', STATUS.LOADING);
      setStatus('component2', STATUS.LOADING);
      setStatus('component1', STATUS.SUCCESS);
      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenLastCalledWith(true);
    });
  });

  describe('when two components are loading and one finishes and another is null', () => {
    it('should be false', () => {
      const spy = jest.fn();
      subscribe(spy);
      setStatus('component1', STATUS.LOADING);
      setStatus('component2', STATUS.LOADING);
      setStatus('component1', STATUS.SUCCESS);
      setStatus('component2', null);
      expect(spy).toHaveBeenCalledTimes(4);
      expect(spy).toHaveBeenLastCalledWith(false);
    });
  });
});
