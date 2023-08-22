type Member = {
  memberId: number;
  nickname: string;
};

export type Post = {
  postId: number;
  member: Member;
  title: string;
  content: string;
  optionA: string;
  optionB: string;
  tag: string[];
  createdDate: string;
  popoularityDate: string | null;
  likeCount: number;
  choiceCount: number;
  commentCount: number;
  chattingActive?: boolean;
  liveChatUserCount?: number;
};

type Comment = {
  commentId: number;
  member: Member;
  option: string | null;
  content: string;
  createdDate: string;
  deletedDate: string | null;
};

export type Notification = {
  notificationId: number;
  checked: boolean;
  createdDate: string;
  postId: number;
  postTitle: string;
};

type Pageable = {
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type PostListData = {
  content: Post[];
  pageable: Pageable;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  empty: boolean;
};

export type CommentListData = {
  content: Comment[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type NotificationData = {
  content: Notification[];
};
