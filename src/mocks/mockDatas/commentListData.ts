type Member = {
  memberId: number;
  nickname: string;
};

type Post = {
  commentId: number;
  member: Member;
  option: string | null;
  content: string;
  createdDate: string;
  deletedDate: string | null;
};

type Pageable = {
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type CommentListData = {
  content: Post[];
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

export const commentListData: CommentListData = {
  content: [
    {
      commentId: 1,
      member: { memberId: 1, nickname: "person132" },
      option: "A",
      content: "너무 재밌다!",
      createdDate: "2023.08.12",
      deletedDate: null,
    },
    {
      commentId: 2,
      member: { memberId: 1, nickname: "person212" },
      option: "B",
      content: "당연히 B지~",
      createdDate: "2023.08.12",
      deletedDate: null,
    },
    {
      commentId: 3,
      member: { memberId: 1, nickname: "person343" },
      option: null,
      content: "😀",
      createdDate: "2023.08.11",
      deletedDate: null,
    },
    {
      commentId: 4,
      member: { memberId: 1, nickname: "person411" },
      option: "A",
      content: "완전 A같은데?",
      createdDate: "2023.08.11",
      deletedDate: null,
    },
    {
      commentId: 5,
      member: { memberId: 1, nickname: "person642" },
      option: "A",
      content: "재밌네 재밌어",
      createdDate: "2023.08.10",
      deletedDate: null,
    },
    {
      commentId: 6,
      member: { memberId: 1, nickname: "person543" },
      option: null,
      content: "이건 진짜 모르겠다...",
      createdDate: "2023.08.10",
      deletedDate: null,
    },
    {
      commentId: 7,
      member: { memberId: 1, nickname: "person77" },
      option: "B",
      content: "너무 B구만",
      createdDate: "2023.08.10",
      deletedDate: null,
    },
    {
      commentId: 8,
      member: { memberId: 1, nickname: "person431" },
      option: "A",
      content: "좀 어려움 이거..",
      createdDate: "2023.08.10",
      deletedDate: null,
    },
    {
      commentId: 9,
      member: { memberId: 1, nickname: "person009" },
      option: "B",
      content: "재밌군",
      createdDate: "2023.08.09",
      deletedDate: null,
    },
    {
      commentId: 10,
      member: { memberId: 1, nickname: "person994" },
      option: "A",
      content: "고민도 안함.. 바로 A",
      createdDate: "2023.08.09",
      deletedDate: null,
    },
    {
      commentId: 11,
      member: { memberId: 1, nickname: "person776" },
      option: null,
      content: "ㅋㅋㅋㅋㅋㅋㅋ",
      createdDate: "2023.08.09",
      deletedDate: null,
    },
    {
      commentId: 12,
      member: { memberId: 1, nickname: "person1775" },
      option: "B",
      content: "ㅋㅋㅋㅋ",
      createdDate: "2023.08.09",
      deletedDate: null,
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: true,
    },
    pageSize: 5,
    pageNumber: 0,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 20,
  totalElements: 100,
  last: false,
  number: 0,
  sort: {
    sorted: true,
    unsorted: false,
    empty: true,
  },
  size: 5,
  numberOfElements: 5,
  first: true,
  empty: false,
};