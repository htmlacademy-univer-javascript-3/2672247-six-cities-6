import appReducer, { changeCity } from './app-slice';
import { DEFAULT_CITY } from '../../const';

describe('appSlice', () => {
  it('returns initial state', () => {
    const state = appReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      city: DEFAULT_CITY.name,
    });
  });

  it('changes city', () => {
    const state = appReducer(undefined, changeCity('Amsterdam'));
    expect(state.city).toBe('Amsterdam');
  });
});
