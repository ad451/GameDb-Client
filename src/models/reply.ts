export interface IReply {
  _id: string;
  body: string;
  contentId: string;
  createdBy: { _id: string; name: string };
  createdAt: Date;
  replies: Array<string>;
  // TODO: ensure that parentid is a valid document with the help of a middleware
  parentId: string | null;
  upvotes: Array<string>;
  downvotes: Array<string>;
}
