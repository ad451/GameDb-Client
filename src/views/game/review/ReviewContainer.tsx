import { FunctionComponent, useState } from 'react';
import { Button, Container, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Masonry from '@mui/lab/Masonry';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { postReview } from '../../../api/review';
import { IReview } from '../../../models/review';
import { fetchReviewAction } from '../../../redux/actions/reviewActions';
import { AppState } from '../../../redux/store';
import { durationUtil } from '../../../utils/durationUtil';
import Review from './Review';

interface ReviewContainerProps {
  contentId: string;
}

const ReviewContainer: FunctionComponent<ReviewContainerProps> = ({
  contentId
}) => {
  const dispatch = useDispatch();
  const reviewState = useSelector((state: AppState) => state.reviewState);
  const token = window.localStorage.getItem('accessToken');

  const isMd = useMediaQuery('(max-width:768px)');
  const isLg = useMediaQuery('(max-width:992px)');
  const isXl = useMediaQuery('(max-width:1400px)');
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [openFullReview, setOpenFullReview] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);

  const noOfCols = isMd ? 1 : isLg ? 2 : isXl ? 3 : 4;
  return (
    <Container className="bg-dark p-3" fluid style={{ borderRadius: '10px' }}>
      <div className="mb-2">
        <Typography color="white" variant="h4" className="mb-2">
          Post a Review:
        </Typography>
        <FormGroup>
          <Form.Control
            value={title}
            className="form-control mb-2"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            as="textarea"
            value={body}
            style={{ minHeight: '100px' }}
            className="form-control"
            placeholder="The game sucks because I ain't good at it...."
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </FormGroup>
        <Button
          className="mt-2"
          variant="primary"
          onClick={async () => {
            if (token === null) return toast('Login first!');
            const review = await postReview(token, contentId, title, body);
            if (review !== null) {
              dispatch(
                fetchReviewAction({
                  reviews: [...reviewState.reviews, review],
                  loading: false,
                  error: null
                })
              );
              setBody('');
              setTitle('');
            }
          }}
        >
          POST
        </Button>
      </div>
      <Divider sx={{ backgroundColor: 'white' }} />

      <div className="mt-4">
        <Typography color="white" variant="h4" className="mb-2">
          User Reviews:
        </Typography>
        {reviewState.loading ? (
          <Typography>Loading ...</Typography>
        ) : reviewState.reviews?.length > 0 ? (
          <Masonry columns={noOfCols} spacing={2}>
            {reviewState.reviews.map((review) => (
              <Review
                onClick={() => setSelectedReview(review)}
                title={review.title}
                description={review.body}
                upvoteCount={review.upvotes.length}
                downvoteCount={review.downvotes.length}
                createdAt={durationUtil(review.createdAt)}
                trimReviewWordCount={100}
                userName={review.createdBy.name}
                setOpenFullReview={setOpenFullReview}
              />
            ))}
          </Masonry>
        ) : (
          <>Wow! No reviews yet!</>
        )}
      </div>
      {selectedReview !== null && (
        <Modal
          open={openFullReview}
          onClose={() => setOpenFullReview(false)}
          style={{ width: '100vw' }}
          className="d-flex justify-content-center align-items-center"
        >
          <div style={{width: "60vw"}}>
            <Review
              title={selectedReview.title}
              description={selectedReview.body}
              upvoteCount={selectedReview.upvotes.length}
              downvoteCount={selectedReview.downvotes.length}
              createdAt={durationUtil(selectedReview.createdAt)}
              userName={selectedReview.createdBy.name}
            />
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default ReviewContainer;
