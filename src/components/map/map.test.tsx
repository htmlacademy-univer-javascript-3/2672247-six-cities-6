import { render, waitFor } from '@testing-library/react';
import Map from './map';
import { CITIES } from '../../const';
import { makeOffer } from '../../test/fixtures';

const setView = vi.fn();

vi.mock('../../hooks/use-map', () => ({
  default: () => ({ setView, removeLayer: vi.fn() }),
}));

vi.mock('leaflet', () => ({
  Icon: vi.fn(),
  Marker: vi.fn().mockImplementation(() => ({
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn(),
  })),
  layerGroup: vi.fn().mockImplementation(() => ({
    addTo: vi.fn(),
  })),
}));

describe('Map', () => {
  it('creates markers for offers', async () => {
    const offers = [
      makeOffer({ id: '1', location: { latitude: 52.0, longitude: 4.0 } }),
      makeOffer({ id: '2', location: { latitude: 52.1, longitude: 4.1 } }),
    ];

    render(
      <Map
        city={CITIES[0]}
        offers={offers}
        activeOfferId={null}
        className="cities__map map"
      />
    );

    const { Marker } = await import('leaflet');

    await waitFor(() => {
      expect(Marker).toHaveBeenCalledTimes(2);
    });

    expect(setView).toHaveBeenCalled();
  });
});
