import { IReview } from '../../models/review';
import { FETCH_REVIEW } from '../actions/reviewActions';

export interface ReviewState {
  reviews: Array<IReview>;
  loading: boolean;
  error: null | Error;
}

export interface IReviewAction {
  type: string;
  payload: ReviewState;
}

export const initialReviewState: ReviewState = {
  reviews: [],
  loading: true,
  error: null
};

export const reviewReducer = (
  state: ReviewState = initialReviewState,
  action: IReviewAction
) => {
  switch (action.type) {
    case FETCH_REVIEW:
      return {
        ...state,
        reviews: action.payload.reviews,
        loading: action.payload.loading,
        error: action.payload.error
      };
    default:
      return state;
  }
};
