import { toast } from 'react-toastify';

import axios from 'axios';

import { IReply } from '../models/reply';

export const fetchRepliesByContentId = async (
  contentId: string,
): Promise<Array<IReply> | null> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reply?contentId=${contentId}`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      const replies = response.data['replies'];
      return replies as Array<IReply>;
    }
    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast('Cannot load replies for the moment. Please try again later');
    } else {
      console.error(e);
    }
    return null;
  }
};

export const postReply = async (
  token: string,
  contentId: string,
  body: string,
  parentId?: string
): Promise<IReply | null> => {
  try {
    const subThreadQuery = parentId !== undefined ? `?parentId=${parentId}` : ""
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reply${subThreadQuery}`,
      {
        contentId,
        body
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status.toString().startsWith('2')) {
      toast('Success!');
      return response.data as IReply;
    }
    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e);
      if (e.response?.status == 401) {
        toast('You need to be signed in for posting replies');
        return null;
      }
      toast('Could not post reply for the moment. Please try again later');
    } else {
      console.error(e);
    }
    return null;
  }
};
