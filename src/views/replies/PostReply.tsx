import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Typography from '@mui/material/Typography';

import { postReply } from '../../api/reply';
import { IReply } from '../../models/reply';

interface PostReplyProps {
  contentId: string;
  setReplies: Dispatch<SetStateAction<Array<IReply> | null>>;
  parentId?: string;
  onSuccess?: () => void;
}
const PostReply: FunctionComponent<PostReplyProps> = ({
  contentId,
  setReplies,
  parentId,
  onSuccess
}) => {
  const token = window.localStorage.getItem('accessToken');
  const [reply, setReply] = useState<string>('');

  return (
    <div className="d-flex flex-row align-items-center justify-content-center p-1">
      <FormGroup className="d-flex flex-grow-1">
        <Form.Control
          value={reply}
          className="form-control"
          placeholder="Title"
          onChange={(e) => setReply(e.target.value)}
          required
        />
      </FormGroup>
      <Button
        variant="primary"
        onClick={async () => {
          if (token === null) return toast('Login first!');
          const replyResponse = await postReply(
            token,
            contentId,
            reply,
            parentId
          );
          if (replyResponse !== null) {
            setReply('');
            setReplies((prevReply) => {
              if (!prevReply) return [replyResponse];
              return [...prevReply, replyResponse];
            });
            if (onSuccess !== undefined) onSuccess();
          }
        }}
      >
        POST
      </Button>
    </div>
  );
};

export default PostReply;
