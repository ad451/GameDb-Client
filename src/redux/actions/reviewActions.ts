import { ReviewState } from "../reducer/reviewReducer";

export const FETCH_REVIEW = 'FETCH_REVIEW';

export const fetchReviewAction = (payload: ReviewState) => ({
  type: FETCH_REVIEW,
  payload: payload
});
