import { atom } from "recoil";

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
