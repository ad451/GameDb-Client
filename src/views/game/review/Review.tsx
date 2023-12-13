import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { FaUser } from 'react-icons/fa';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ReadMore from '../../../components/ReadMore/ReadMore';
import DownvoteButton from '../../../components/VoteButtons/Downvote';
import UpvoteButton from '../../../components/VoteButtons/Upvote';
import ReplyThread from '../../replies/ReplyThread';

interface ReviewProps {
  reviewId: string;
  title: string;
  description: string;
  userName: string;
  createdAt: string;
  upvotes: Array<string>;
  downvotes: Array<string>;
  trimReviewWordCount?: number;
  openFullReview?: boolean;
  setOpenFullReview?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
}

const Review: FunctionComponent<ReviewProps> = ({
  reviewId,
  title,
  description,
  userName,
  createdAt,
  upvotes,
  downvotes,
  trimReviewWordCount,
  openFullReview,
  setOpenFullReview,
  onClick
}) => {
  const wordCount = description.length;
  const wordLimit = 1500;
  const minHeight = 200;
  const maxHeight = 900;
  const height =
    ((wordCount - wordLimit) / wordLimit) * (maxHeight - minHeight) + maxHeight;

  return (
    <div
      style={{
        borderRadius: '10px',
        backgroundColor: '#737672',
        maxHeight: openFullReview ? '100vh' : height,
        minHeight: minHeight,
        overflowY: 'auto'
      }}
      className="p-2 px-3 d-flex flex-column justify-content-between"
    >
      <div
        onClick={() => {
          if (onClick !== undefined) onClick();
          if (setOpenFullReview !== undefined) setOpenFullReview(true);
        }}
      >
        <Grid
          container
          className="mt-2 ps-3"
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={1}
        >
          <Typography color="white" variant="h5">
            {title}
          </Typography>
          <div className="d-flex flex-row justify-content-around">
            <Avatar className="mr-1" sx={{ width: 20, height: 20 }}>
              <FaUser size={10} />
            </Avatar>
            <Typography className="mx-1" color="white">
              {userName}
            </Typography>
            <Typography className="mx-1" color="lightgrey">
              {' '}
              {createdAt} ago
            </Typography>
          </div>
        </Grid>

        <Divider sx={{ backgroundColor: 'white' }}></Divider>

        <Grid className="mt-2">
          <Typography color="white" textAlign={'justify'}>
            {trimReviewWordCount !== undefined ? (
              <ReadMore wordLimit={trimReviewWordCount}>{description}</ReadMore>
            ) : (
              description
            )}
          </Typography>
        </Grid>
      </div>
      <div>
        <Divider sx={{ backgroundColor: 'white' }}></Divider>

        <div className="mt-1 d-flex flex-row justify-content-start">
          <UpvoteButton upvotes={upvotes} downvotes={downvotes} contentId={reviewId}/>
          <DownvoteButton upvotes={upvotes} downvotes={downvotes} contentId={reviewId}/>
        </div>
      </div>
      {openFullReview && <ReplyThread contentId={reviewId} />}
    </div>
  );
};

export default Review;
