export interface INewsArticle {
  _id: string;
  slug: string;
  title: string;
  content: string;
  author?: string;
  readTime?: string;
  introduction?: string;
  imageUrl?: string;
  disclaimer?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICommentReply {
  userId: string;
  comId: string;
  fullName: string;
  text: string;
  avatarUrl: string;
  timestamp: string;
  userProfile?: string;
}

export interface IComment {
  userId: string;
  comId: string;
  fullName: string;
  text: string;
  avatarUrl: string;
  timestamp: string;
  userProfile?: string;
  replies: ICommentReply[];
}

export interface ICurrentUser {
  currentUserId: string;
  currentUserImg: string;
  currentUserProfile: string;
  currentUserFullName: string;
}

export interface ICommentsProps {
  commentData: IComment[];
  onSubmitComment?: (data: IComment) => void;
}
