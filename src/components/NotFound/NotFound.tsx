import { FunctionComponent } from 'react';
import { Image } from 'react-bootstrap';

import { Typography } from '@mui/material';

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <Typography variant="h1" color="white">404. Not Found.</Typography>;
      <Image src="https://i.kym-cdn.com/entries/icons/original/000/023/967/obiwan.jpg"></Image>
    </div>
  );
};

export default NotFound;
