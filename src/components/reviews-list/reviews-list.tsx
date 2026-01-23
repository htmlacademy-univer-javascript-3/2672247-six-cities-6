import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/review';

type ReviewsListProps = {
  reviews: Review[];
  totalCount?: number;
};

function ReviewsList({ reviews, totalCount }: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{totalCount ?? reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
