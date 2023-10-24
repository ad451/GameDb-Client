import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { FaThumbsDown, FaThumbsUp, FaUser } from 'react-icons/fa';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ReadMore from '../../../components/ReadMore/ReadMore';

interface ReviewProps {
  title: string;
  description: string;
  userName: string;
  createdAt: string;
  upvoteCount: number;
  downvoteCount: number;
  trimReviewWordCount?: number;
  setOpenFullReview?: Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
}

const Review: FunctionComponent<ReviewProps> = ({
  title,
  description,
  userName,
  createdAt,
  upvoteCount,
  downvoteCount,
  trimReviewWordCount,
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
        maxHeight: height,
        minHeight: minHeight
      }}
      className="p-2 px-3 d-flex flex-column justify-content-between"
      onClick={() => {
        if (onClick !== undefined) onClick();
        if (setOpenFullReview !== undefined) setOpenFullReview(true);
      }}
    >
      <div>
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
            ): description}
          </Typography>
        </Grid>
      </div>
      <div>
        <Divider sx={{ backgroundColor: 'white' }}></Divider>

        <div className="mt-2 d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <FaThumbsUp className="mx-1" color="lightgrey" size={25} />
            <Typography className="mx-1" color="lightgrey">
              {upvoteCount}
            </Typography>
            <FaThumbsDown className="mx-1" color="lightgrey" size={25} />
            <Typography className="mx-1" color="lightgrey">
              {downvoteCount}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
