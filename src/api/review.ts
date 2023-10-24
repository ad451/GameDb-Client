import { toast } from 'react-toastify';

import axios from 'axios';

import { IReview } from '../models/review';
import { fetchReviewAction } from '../redux/actions/reviewActions';
import { AppDispatch } from '../redux/store';

export const fetchReviewsByGameId = async (
  contentId: string,
  dispatch: AppDispatch
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/review?contentId=${contentId}`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      const reviews = response.data['reviews'];
      dispatch(
        fetchReviewAction({
          reviews: reviews as IReview[],
          loading: false,
          error: null
        })
      );
    }
    return true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast('Cannot load reviews for the moment. Please try again later');
    } else {
      console.error(e);
    }
    return false;
  }
};

export const postReview = async (
  token: string,
  contentId: string,
  title: string,
  body: string
): Promise<IReview | null> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/review?contentId=${contentId}`,
      {
        contentId,
        title,
        body
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      toast('Success!');
      return response.data as IReview;
    }
    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e)
      if (e.response?.status == 401) {
        toast('You need to be signed in for posting reviews');
        return null;
      }
      toast('Could not post review for the moment. Please try again later');
    } else {
      console.error(e);
    }
    return null;
  }
};
