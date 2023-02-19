import { shared } from './shared';

it('should return the correct value', () => {
  expect(shared()).toBe('Hello world!');
});
