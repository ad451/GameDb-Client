import { FunctionComponent, useState } from 'react';
import './ReadMore.scss'

interface ReadMoreProps {
  children: string;
  wordLimit: number;
}

const ReadMore: FunctionComponent<ReadMoreProps> = ({
  children,
  wordLimit
}) => {
  const [readMore, setReadMore] = useState(false);
  const wordCount = children.split(' ').length;
  return wordCount < wordLimit ? (
    <>{children}</>
  ) : readMore ? (
    <>
      {children}{' '}
      <span className="readmore-btn" onClick={() => setReadMore(false)}>
        Show Less
      </span>
    </>
  ) : (
    <>
      {children.split(' ').slice(0, wordLimit).join(' ')}...{' '}
      <span className="readmore-btn" onClick={() => setReadMore(true)}>
        Read More
      </span>
    </>
  );
};

export default ReadMore;
