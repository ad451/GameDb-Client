import { toast } from 'react-toastify';

import axios from 'axios';

export const postVote = async (
  token: string,
  reviewId: string,
  type: 'upvote' | 'downvote'
): Promise<string | null> => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/review/${reviewId}/${type}`,
      {},
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
      return response.data;
    }
    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // console.log(e)
      if (e.response?.status == 401) {
        toast('You need to be signed in for upvoting / downvoting');
        return null;
      }
      toast('Could not add vote for the moment, please try again later');
    } else {
      console.error(e);
    }
    return null;
  }
};
