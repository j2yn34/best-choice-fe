import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState, userInfoState } from "../../states/recoil";
import { UserInfoState } from "../../states/recoilType";

const ChangeNickname = ({ closeModal }: { closeModal: () => void }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const token = useRecoilValue<string>(accessTokenState);
  const setUserInfo = useSetRecoilState<UserInfoState>(userInfoState);

  const checkMessage = "유효성 검사 메시지";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios({
        method: "put",
        url: `/api/api/members`,
        data: { nickname: inputValue },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo((prev) => ({
        ...prev,
        nickname: inputValue,
      }));
    } catch (error) {
      console.error("닉네임 변경 실패: ", error);
      return;
    }

    closeModal();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.8] z-50">
      <div className="flex flex-col mx-2 w-fit h-fit rounded-xl bg-white z-20 p-4">
        <button className="flex justify-end text-2xl" onClick={closeModal}>
          <MdOutlineClose />
        </button>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 w-full h-full px-4 py-2 md:px-8"
        >
          <p className="text-lg text-center">새로운 닉네임을 입력해 주세요.</p>
          <div>
            <input
              type="text"
              className="input bg-color-bg w-full border-0 rounded-none focus:outline-none"
              placeholder="닉네임"
              onChange={handleChange}
              value={inputValue}
              required
            />
            <p className="text-xs text-red-dark pt-1">* {`${checkMessage}`}</p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn px-8 bg-black-primary text-white hover:bg-black"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeNickname;
