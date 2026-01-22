import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type OfferCardProps = {
  offer: Offer;
  variant?: 'cities' | 'favorites' | 'near-places';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const ratingToPercent = (rating: number): string => `${Math.round(rating) * 20}%`;

function OfferCard({ offer, variant = 'cities', onMouseEnter, onMouseLeave }: OfferCardProps): JSX.Element {
  const cardClassName = (() => {
    switch (variant) {
      case 'favorites':
        return 'favorites__card';
      case 'near-places':
        return 'near-places__card';
      default:
        return 'cities__card';
    }
  })();

  const imageWrapperClassName = (() => {
    switch (variant) {
      case 'favorites':
        return 'favorites__image-wrapper';
      case 'near-places':
        return 'near-places__image-wrapper';
      default:
        return 'cities__image-wrapper';
    }
  })();

  const infoClassName = variant === 'favorites' ? 'favorites__card-info' : '';
  const imageWidth = variant === 'favorites' ? 150 : 260;
  const imageHeight = variant === 'favorites' ? 110 : 200;
  const bookmarkClassName = `place-card__bookmark-button button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''}`;
  const bookmarkText = offer.isFavorite ? 'In bookmarks' : 'To bookmarks';

  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className={[infoClassName, 'place-card__info'].filter(Boolean).join(' ')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkClassName} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkText}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingToPercent(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
