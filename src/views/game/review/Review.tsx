import { FunctionComponent, useState } from 'react';
import { FaThumbsDown, FaThumbsUp, FaUser } from 'react-icons/fa';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
}

const Review: FunctionComponent<ReviewProps> = ({
  title,
  description,
  userName,
  createdAt,
  upvoteCount,
  downvoteCount
}) => {
  const wordCount = description.length;
  console.log(wordCount)
  const wordLimit = 1500;
  const minHeight = 200;
  const maxHeight = 900;
  const height =
    ((wordCount - wordLimit) / wordLimit) * (maxHeight - minHeight) + maxHeight;
  console.log(height);
  return (
    <div
      style={{ borderRadius: '10px', backgroundColor: '#737672', maxHeight: height }}
      className="p-2 px-3"
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
          <ReadMore wordLimit={100}>{description}</ReadMore>
        </Typography>
        <Divider sx={{ backgroundColor: 'white' }}></Divider>
      </Grid>

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
  );
};

export default Review;
