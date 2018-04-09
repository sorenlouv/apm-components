import { get } from 'lodash';
export function reducer(state = {}, action) {
  switch (action.type) {
    case 'requestStatusChange': {
      const { id, status, data, error, hashedArgs } = action;
      return {
        ...state,
        [id]: {
          status,
          data: data || get(state[id], 'data'),
          error: error || get(state[id], 'error'),
          hashedArgs
        }
      };
    }
    default:
      return state;
  }
}
