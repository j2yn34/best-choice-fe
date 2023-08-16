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
  heartCount: number;
  choiceCount: number;
  commentCount: number;
  chattingActive?: boolean;
  liveChatUserCount?: number;
};

type Pageable = {
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ActiveChatListData = {
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

export const activeChatListData: ActiveChatListData = {
  content: [
    {
      postId: 2,
      member: { memberId: 2, nickname: "person2" },
      title: "소개팅 장소 어디가 좋을까요?",
      content: "분위기 좋은 카페와 레스토랑 중에 고민 중인데 어디로 잡을까요?",
      optionA: "카페",
      optionB: "레스토랑",
      tag: ["데이트", "소개팅"],
      createdDate: "2023.08.10",
      popoularityDate: null,
      heartCount: 12,
      choiceCount: 10,
      commentCount: 5,
      liveChatUserCount: 9,
    },
    {
      postId: 5,
      member: { memberId: 5, nickname: "person5" },
      title: "요즘 날씨에 어울리는 옷은?",
      content: "긴팔 입을까 반팔 입을까",
      optionA: "긴팔",
      optionB: "반팔",
      tag: ["코디", "날씨"],
      createdDate: "2023.08.11",
      popoularityDate: null,
      heartCount: 10,
      choiceCount: 10,
      commentCount: 5,
      liveChatUserCount: 5,
    },
    {
      postId: 7,
      member: { memberId: 7, nickname: "person7" },
      title: "민초 호불호 투표",
      content: "민초파 있나요??",
      optionA: "호",
      optionB: "불호",
      tag: ["음식"],
      createdDate: "2023.08.12",
      popoularityDate: null,
      heartCount: 2,
      choiceCount: 5,
      commentCount: 0,
      liveChatUserCount: 8,
    },
    {
      postId: 8,
      member: { memberId: 8, nickname: "person8" },
      title: "영화 vs 드라마",
      content: "영화가 좋다 드라마가 좋다",
      optionA: "영화",
      optionB: "드라마",
      tag: ["취미"],
      createdDate: "2023.08.13",
      popoularityDate: null,
      heartCount: 12,
      choiceCount: 20,
      commentCount: 2,
      liveChatUserCount: 10,
    },
    {
      postId: 11,
      member: { memberId: 11, nickname: "person11" },
      title: "쇼미더머니 지원 영상 올리기 vs 미스터트롯 출연",
      content: "랩에 소질 없음 트로트도 소질 없음",
      optionA: "쇼미더머니",
      optionB: "미스터트롯",
      tag: ["밸런스"],
      createdDate: "2023.08.15",
      popoularityDate: null,
      heartCount: 22,
      choiceCount: 50,
      commentCount: 10,
      liveChatUserCount: 9,
    },
    {
      postId: 12,
      member: { memberId: 12, nickname: "person12" },
      title: "1주일 동안 삼시세끼 치킨만 먹기 vs 3년 동안 치킨 못 먹기",
      content: "1주일 동안 삼시세끼 꼬박꼬박 치킨만 먹어야함.",
      optionA: "3년 동안 치킨 못 먹기",
      optionB: "삼시세끼 치킨 먹기",
      tag: ["밸런스"],
      createdDate: "2023.08.16",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 6,
    },
    {
      postId: 13,
      member: { memberId: 13, nickname: "person13" },
      title: "모르는 게 상책 vs 모르는 개 산책",
      content: "모르는 개 완전 귀여움",
      optionA: "그래도 모르는 게 상책",
      optionB: "모르는 개랑 산책",
      tag: ["밸런스"],
      createdDate: "2023.08.16",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 10,
    },
    {
      postId: 14,
      member: { memberId: 14, nickname: "person14" },
      title: "친구가 자꾸 안읽씹을 해요..",
      content:
        "저는 차라리 읽씹이 나은데 며칠동안 아예 읽지도 않아서 너무 화나거든요. 근데 친구는 읽씹 하는 거보다 낫지 않냐고 하네요.",
      optionA: "안읽씹이 더 별로다",
      optionB: "읽씹이 더 별로다.",
      tag: ["연락"],
      createdDate: "2023.08.17",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 7,
    },
    {
      postId: 15,
      member: { memberId: 15, nickname: "person15" },
      title: "1년 내내 같은 계절이라면?",
      content: "여름이랑 겨울 중에 어느 게 더 나을까요",
      optionA: "1년 내내 여름",
      optionB: "1년 내내 겨울",
      tag: ["계절"],
      createdDate: "2023.08.17",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 4,
    },
    {
      postId: 16,
      member: { memberId: 16, nickname: "person16" },
      title: "학교에 대한 질문",
      content: "학교에 대한 질문입니다.",
      optionA: "원격 수업이 좋다",
      optionB: "대면 수업이 좋다.",
      tag: ["공부", "학교"],
      createdDate: "2023.08.17",
      popoularityDate: null,
      heartCount: 14,
      choiceCount: 20,
      commentCount: 5,
      liveChatUserCount: 6,
    },
    {
      postId: 17,
      member: { memberId: 17, nickname: "person17" },
      title: "어느 날 갑자기 능력을 갖게 된다면?",
      content: "둘 중에 어떤 능력이 더 갖고 싶으신가요?",
      optionA: "4개국어 현지인 수준으로 가능",
      optionB: "다른 사람 속마음 읽기(모르는 언어면 못 읽음)",
      tag: ["능력"],
      createdDate: "2023.08.18",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 6,
    },
    {
      postId: 18,
      member: { memberId: 18, nickname: "person18" },
      title: "노래 천재 되기 vs 춤 천재 되기",
      content: "뭐가 더 좋을까?",
      optionA: "노래 천재",
      optionB: "춤 천재",
      tag: ["밸런스"],
      createdDate: "2023.08.18",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 5,
    },
    {
      postId: 19,
      member: { memberId: 19, nickname: "person19" },
      title: "둘 중 하나의 버튼을 누른다면",
      content: "뭐 누르실 건가요?",
      optionA: "100% 확률로 1000만원 받기",
      optionB: "30% 확률로 1억 받기",
      tag: ["밸런스"],
      createdDate: "2023.08.19",
      popoularityDate: null,
      heartCount: 0,
      choiceCount: 0,
      commentCount: 0,
      liveChatUserCount: 10,
    },
  ],
  pageable: {
    sort: { sorted: true, unsorted: false, empty: true },
    pageNumber: 1,
    pageSize: 10,
    offset: 10,
    paged: true,
    unpaged: false,
  },
  number: 1,
  numberOfElements: 10,
  first: false,
  last: false,
  size: 10,
  sort: { sorted: true, unsorted: false, empty: true },
  empty: false,
};
