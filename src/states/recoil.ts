import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserInfoState } from "./recoilType";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

export const accessTokenState = atom<string>({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<UserInfoState>({
  key: "userInfo",
  default: {
    memberId: 0,
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const inputValueState = atom({
  key: "inputValueState",
  default: {
    title: "",
    content: "",
    optionA: "",
    optionB: "",
    tags: [],
    imageFile: null,
    videoFile: null,
  },
});

export const commentLengthState = atom({
  key: "commentLengthState",
  default: 0,
});
