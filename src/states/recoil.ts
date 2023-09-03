import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "token",
  storage: sessionStorage,
});

export const accessTokenState = atom<string>({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
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
