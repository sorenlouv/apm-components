import EventEmitter from 'events';
import { some } from 'lodash';

export const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

const myEmitter = new EventEmitter();
let componentStatuses = {};

// Only used between tests
// TODO: a better approach is to shared state, and instead explicitly init a RequestState instance
export function _purge() {
  componentStatuses = {};
}

export function setStatus(componentId, status) {
  componentStatuses[componentId] = status;

  const isLoading = some(
    componentStatuses,
    componentStatus => componentStatus === STATUS.LOADING
  );

  myEmitter.emit('loadingChange', isLoading);
}

export function subscribe(cb) {
  myEmitter.on('loadingChange', cb);
}
