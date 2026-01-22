import { memo } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  variant?: 'cities' | 'favorites' | 'near-places';
  onActiveOfferChange?: (offerId: string | null) => void;
  onFavoriteToggle?: (offerId: string, isFavorite: boolean) => void;
};

function OffersList({
  offers,
  variant = 'cities',
  onActiveOfferChange,
  onFavoriteToggle,
}: OffersListProps): JSX.Element {
  const listClassName = (() => {
    switch (variant) {
      case 'favorites':
        return 'favorites__places';
      case 'near-places':
        return 'near-places__list places__list';
      default:
        return 'cities__places-list places__list tabs__content';
    }
  })();

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={() => onActiveOfferChange?.(offer.id)}
          onMouseLeave={() => onActiveOfferChange?.(null)}
          onBookmarkClick={() => onFavoriteToggle?.(offer.id, offer.isFavorite)}
        />
      ))}
    </div>
  );
}

const MemoizedOffersList = memo(OffersList);

export default MemoizedOffersList;
