export type UserInfoState = {
  memberId: number;
  nickname: string;
};

export type InputValue = {
  title: string;
  content: string;
  optionA: string;
  optionB: string;
  tags: string[] | [];
  imageFile: File[] | null;
  videoFile: File[] | null;
};
