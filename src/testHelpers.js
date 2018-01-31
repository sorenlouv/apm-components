import enzymeToJson from 'enzyme-to-json';
import 'jest-styled-components';

export function toJson(wrapper) {
  return enzymeToJson(wrapper, {
    noKey: true,
    mode: 'deep'
  });
}
