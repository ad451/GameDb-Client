import { FunctionComponent, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { fetchRepliesByContentId } from '../../api/reply';
import { IReply } from '../../models/reply';
import { durationUtil } from '../../utils/durationUtil';
import PostReply from './PostReply';
import Reply from './Reply';

interface ReplyThreadProps {
  contentId: string;
}

const ReplyThread: FunctionComponent<ReplyThreadProps> = ({ contentId }) => {
  const [replies, setReplies] = useState<Array<IReply> | null>(null);
  useEffect(() => {
    (async () => {
      const replies = await fetchRepliesByContentId(contentId);
      setReplies(replies);

      return () => {
        setReplies(null);
      };
    })();
  }, []);

  return (
    <div>
      <Typography color="white" variant="h6" className="m-2">
        Replies:
      </Typography>
      <PostReply contentId={contentId} setReplies={setReplies}/>
      {replies !== null &&
        replies
          .filter((el) => {
            return el.parentId === null;
          })
          .map((el) => (
            <Reply
              _id={el._id}
              body={el.body}
              contentId={el.contentId}
              createdBy={el.createdBy.name}
              createdAt={durationUtil(el.createdAt)}
              replies={replies}
              parentId={el.parentId}
              upvotes={el.upvotes}
              downvotes={el.downvotes}
              setReplies={setReplies}
            />
          ))}
    </div>
  );
};

export default ReplyThread;
