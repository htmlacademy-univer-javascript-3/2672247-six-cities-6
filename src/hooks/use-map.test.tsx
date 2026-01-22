import { renderHook, waitFor } from '@testing-library/react';
import type { MutableRefObject } from 'react';
import useMap from './use-map';
import { CITIES } from '../const';

const addLayer = vi.fn();
const setView = vi.fn();

vi.mock('leaflet', () => ({
  Map: vi.fn().mockImplementation(() => ({
    addLayer,
    setView,
  })),
  TileLayer: vi.fn().mockImplementation(() => ({})),
}));

describe('useMap', () => {
  it('creates map once for a mounted ref', async () => {
    const mapRef = { current: document.createElement('div') } as MutableRefObject<HTMLElement | null>;
    const city = CITIES[0];

    const { result, rerender } = renderHook(({ currentCity }) => useMap(mapRef, currentCity), {
      initialProps: { currentCity: city },
    });

    await waitFor(() => expect(result.current).not.toBeNull());
    expect(addLayer).toHaveBeenCalled();

    const { Map } = await import('leaflet');
    expect(Map).toHaveBeenCalledTimes(1);

    rerender({ currentCity: CITIES[1] });
    expect(Map).toHaveBeenCalledTimes(1);
  });
});
