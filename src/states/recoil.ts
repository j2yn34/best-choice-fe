import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserDataState } from "./recoilType";

const { persistAtom } = recoilPersist({
  key: "token",
  storage: sessionStorage,
});

export const accessTokenState = atom<string>({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userDataState = atom<UserDataState>({
  key: "userData",
  default: {
    memberId: 0,
    nickname: "",
  },
});

export const inputValueState = atom({
  key: "inputValueState",
  default: {
    title: "",
    content: "",
    optionA: "",
    optionB: "",
    tags: null,
    files: null,
  },
});

export const commentLengthState = atom({
  key: "commentLengthState",
  default: 0,
});
