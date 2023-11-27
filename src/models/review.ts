export interface IReview {
  _id: string;
  title: string;
  body: string;
  contentId: string;
  createdBy: { _id: string; name: string };
  createdAt: Date;
  replies: Array<string>; //TODO: reply, upvote and downvote models
  upvotes: Array<string>;
  downvotes: Array<string>;
}
