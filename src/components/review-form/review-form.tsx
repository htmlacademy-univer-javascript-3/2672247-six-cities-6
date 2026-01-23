import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

type ReviewFormProps = {
  onSubmit: (comment: string, rating: number) => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

type ReviewFormState = {
  rating: string;
  comment: string;
};

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function ReviewForm({ onSubmit, isSubmitting = false, errorMessage = null }: ReviewFormProps): JSX.Element {
  const [formState, setFormState] = useState<ReviewFormState>({
    rating: '',
    comment: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      rating: event.target.value,
    }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      comment: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.rating) {
      return;
    }

    onSubmit(formState.comment, Number(formState.rating));
    setIsSubmitted(true);
  };

  const isSubmitDisabled =
    isSubmitting ||
    formState.rating === '' ||
    formState.comment.length < MIN_COMMENT_LENGTH ||
    formState.comment.length > MAX_COMMENT_LENGTH;

  useEffect(() => {
    if (isSubmitted && !isSubmitting && !errorMessage) {
      setFormState({ rating: '', comment: '' });
      setIsSubmitted(false);
      return;
    }

    if (isSubmitted && errorMessage) {
      setIsSubmitted(false);
    }
  }, [errorMessage, isSubmitted, isSubmitting]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={formState.rating === '5'}
          onChange={handleRatingChange}
          disabled={isSubmitting}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={formState.rating === '4'}
          onChange={handleRatingChange}
          disabled={isSubmitting}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={formState.rating === '3'}
          onChange={handleRatingChange}
          disabled={isSubmitting}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={formState.rating === '2'}
          onChange={handleRatingChange}
          disabled={isSubmitting}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={formState.rating === '1'}
          onChange={handleRatingChange}
          disabled={isSubmitting}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        {errorMessage && <p className="reviews__error">{errorMessage}</p>}
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
