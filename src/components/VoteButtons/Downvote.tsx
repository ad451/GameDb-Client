import { FunctionComponent, useState } from 'react';
import { FaThumbsDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { IconButton, Typography } from '@mui/material';

import { postVote } from '../../api/votes';
import { IReview } from '../../models/review';
import { fetchReviewAction } from '../../redux/actions/reviewActions';
import { AppState } from '../../redux/store';

interface DownvoteProps {
  upvotes: Array<string>;
  downvotes: Array<string>;
  contentId: string;
}

const Downvote: FunctionComponent<DownvoteProps> = ({
  upvotes,
  downvotes,
  contentId
}) => {
  const userState = useSelector((state: AppState) => state.userState);
  const reviewState = useSelector((state: AppState) => state.reviewState);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('accessToken');

  return (
    <div className="d-flex flex-row align-items-center justify-content-start">
      <IconButton
        sx={{ py: 1 }}
        onClick={async () => {
          if (!userState.user.userId || !token) return toast('Please Login to downvote');

          let updatedUpvotes = upvotes;
          let updatedDownvotes = downvotes;

          if (upvotes.includes(userState.user.userId))
            updatedUpvotes = [
              ...upvotes.filter((id) => id !== userState.user.userId)
            ];

          if (!downvotes.includes(userState.user.userId))
            updatedDownvotes = [...downvotes, userState.user.userId];
          else {
            updatedDownvotes = [
              ...downvotes.filter((id) => id !== userState.user.userId)
            ];
          }

          let updatedReview: IReview = reviewState.reviews.filter(
            (el) => el._id === contentId
          )[0];
          updatedReview.upvotes = updatedUpvotes;
          updatedReview.downvotes = updatedDownvotes;

          let reviews: Array<IReview> = reviewState.reviews.filter(
            (el) => el._id !== contentId
          );

          dispatch(
            fetchReviewAction({
              reviews: [...reviews, updatedReview],
              loading: false,
              error: null
            })
          );

          const res = await postVote(token, contentId, 'downvote');
          if (!res) {
            let updatedReview: IReview = reviewState.reviews.filter(
              (el) => el._id === contentId
            )[0];
            updatedReview.upvotes = upvotes;
            updatedReview.downvotes = downvotes;

            let reviews: Array<IReview> = reviewState.reviews.filter(
              (el) => el._id !== contentId
            );

            dispatch(
              fetchReviewAction({
                reviews: [...reviews, updatedReview],
                loading: false,
                error: null
              })
            );
          }
        }}
      >
        <FaThumbsDown className="mx-1" color="lightgrey" size={25} />
      </IconButton>
      <Typography className="mx-1" color="lightgrey">
        {downvotes.length}
      </Typography>
    </div>
  );
};

export default Downvote;
