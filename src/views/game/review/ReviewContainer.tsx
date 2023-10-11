import { FunctionComponent } from 'react';
import { Container, Form, FormGroup } from 'react-bootstrap';

import Masonry from '@mui/lab/Masonry';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Review from './Review';

interface ReviewContainerProps {}
const title = 'A Demo Review';
const description = `"The Witcher 3: Wild Hunt" stands as a magnum opus in the world of open-world RPGs. CD Projekt Red's masterpiece weaves a complex and gripping narrative within a breathtakingly realized open world. The game's rich storytelling, deeply layered characters, and morally ambiguous choices set it apart in the genre.

From the moment you step into the war-torn land of Temeria, you're immersed in a world that feels alive. The attention to detail is staggering, with lush forests, treacherous swamps, and bustling cities that make you forget you're in a virtual realm. The game's day-night cycle and dynamic weather contribute to an immersive experience.

Geralt of Rivia, the titular Witcher, is a compelling protagonist, and his journey to find Ciri and grapple with his own past is nothing short of epic. The side quests, often more engrossing than main quests in other games, add layers to the already intricate story.

Combat is both satisfying and challenging, requiring strategic thinking and preparation. The game's bestiary, alchemy system, and skill tree add depth to the battles.

"The Witcher 3: Wild Hunt" isn't without its flaws; it can be daunting, and the interface can feel cluttered. But these are minor quibbles in an otherwise stellar package. This game is a must-play for any RPG enthusiast, a shining example of what the genre can achieve when storytelling, world-building, and gameplay are harmoniously executed.`;

const ReviewContainer: FunctionComponent<ReviewContainerProps> = () => {
  const heights = [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];
  const isMd = useMediaQuery('(max-width:768px)');
  const isLg = useMediaQuery('(max-width:992px)');
  const isXl = useMediaQuery('(max-width:1400px)');

  const noOfCols = isMd ? 1 : isLg ? 2 : isXl ? 3 : 4;
  return (
    <Container className="bg-dark p-3" fluid style={{ borderRadius: '10px' }}>
      <div className="mb-4">
        <Typography color="white" variant="h4" className="mb-2">
          Post a Review:
        </Typography>
        <FormGroup>
          <Form.Control
            as="textarea"
            style={{ minHeight: '100px' }}
            className="form-control"
            placeholder="The game sucks because I ain't good at it...."
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
      </div>
      <Divider sx={{ backgroundColor: 'white' }} />

      <div className="mt-4">
        <Typography color="white" variant="h4" className="mb-2">
          User Reviews:
        </Typography>
        <Masonry columns={noOfCols} spacing={2}>
          {heights.map((height, index) => (
            <Review
              title={title}
              description={description}
              upvoteCount={100}
              downvoteCount={2}
              createdAt="2 hrs"
              userName="Toji"
            ></Review>
          ))}
        </Masonry>
      </div>
    </Container>
  );
};

export default ReviewContainer;
