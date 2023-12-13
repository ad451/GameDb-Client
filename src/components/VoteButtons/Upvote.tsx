import { FunctionComponent, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { postVote } from '../../api/votes';
import { IReview } from '../../models/review';
import { fetchReviewAction } from '../../redux/actions/reviewActions';
import { AppState } from '../../redux/store';

interface UpvoteButtonProps {
  contentId: string;
  upvotes: Array<string>;
  downvotes: Array<string>;
}

const UpvoteButton: FunctionComponent<UpvoteButtonProps> = ({
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
          if (!userState.user.userId || !token)
            return toast('Please Login to upvote');

          console.log(upvotes, downvotes);

          let updatedUpvotes = upvotes;
          let updatedDownvotes = downvotes;

          if (downvotes.includes(userState.user.userId))
            updatedDownvotes = [
              ...downvotes.filter((id) => id !== userState.user.userId)
            ];

          if (!upvotes.includes(userState.user.userId))
            updatedUpvotes = [...upvotes, userState.user.userId];
          else {
            updatedUpvotes = [
              ...upvotes.filter((id) => id !== userState.user.userId)
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

          const res = await postVote(token, contentId, 'upvote');
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
        <FaThumbsUp className="mx-1" color={upvotes.includes(userState.user.userId) ? "red": "lightgrey"} size={25} />
      </IconButton>
      <Typography className="mx-1" color="lightgrey">
        {upvotes.length}
      </Typography>
    </div>
  );
};

export default UpvoteButton;
