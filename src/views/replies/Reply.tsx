import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { FaReply, FaThumbsDown, FaThumbsUp, FaUser } from 'react-icons/fa';

import { Avatar, Typography } from '@mui/material';

import { IReply } from '../../models/reply';
import { durationUtil } from '../../utils/durationUtil';
import PostReply from './PostReply';
import './reply.scss';

interface ReplyProps {
  _id: string;
  body: string;
  contentId: string;
  createdBy: string;
  createdAt: string;
  replies: Array<IReply> | null;
  // TODO: ensure that parentid is a valid document with the help of a middleware
  setReplies: Dispatch<SetStateAction<Array<IReply> | null>>;
  parentId: string | null;
  upvotes: Array<string>;
  downvotes: Array<string>;
}

const Reply: FunctionComponent<ReplyProps> = (reply) => {
  const [showSubThread, setShowSubThread] = useState<boolean>(false);
  const [showSubReplyBox, setShowSubReplyBox] = useState<boolean>(false);

  const toggleSubReplyBox = () => {
    setShowSubReplyBox(!showSubReplyBox);
  };

  return (
    <div style={{ width: '100%' }} className="d-flex flex-column mt-2">
      <div className="d-flex flex-row justify-content-start align-items-center">
        <Avatar className="mr-1" sx={{ width: 15, height: 15 }}>
          <FaUser size={10} />
        </Avatar>
        <Typography className="mx-1" color="white">
          {reply.createdBy}
        </Typography>
        <Typography className="mx-1" color="lightgrey">
          {reply.createdAt} ago
        </Typography>
      </div>
      <div className="reply ms-2">
        <Typography color="white">{reply.body}</Typography>

        <div className="mt-1 d-flex flex-row justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <FaThumbsUp className="mx-1" color="lightgrey" size={15} />
            <Typography className="mx-1" color="lightgrey">
              {reply.upvotes}
            </Typography>
            <FaThumbsDown className="mx-1" color="lightgrey" size={15} />
            <Typography className="mx-1" color="lightgrey">
              {reply.downvotes}
            </Typography>
            <FaReply
              className="mx-1"
              color="lightgrey"
              size={15}
              onClick={() => toggleSubReplyBox()}
            />
          </div>
        </div>
        {showSubThread &&
          reply.replies !== null &&
          reply.replies
            .filter((sub) => sub.parentId === reply._id)
            .map((el) => {
              return (
                <Reply
                  _id={el._id}
                  body={el.body}
                  contentId={el.contentId}
                  createdBy={el.createdBy.name}
                  createdAt={durationUtil(el.createdAt)}
                  replies={reply.replies}
                  parentId={el.parentId}
                  upvotes={el.upvotes}
                  downvotes={el.downvotes}
                  setReplies={reply.setReplies}
                />
              );
            })}
      </div>
      {showSubReplyBox && (
        <div className="w-50">
          <PostReply
            contentId={reply.contentId}
            parentId={reply._id}
            setReplies={reply.setReplies}
            onSuccess={() => {
              setShowSubThread(true);
              setShowSubReplyBox(false);
            }}
          ></PostReply>
        </div>
      )}
      <Typography
        color="lightgrey"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setShowSubThread(!showSubThread);
        }}
      >
        {showSubThread ? 'Hide' : 'Show'} Replies
      </Typography>
    </div>
  );
};

export default Reply;
