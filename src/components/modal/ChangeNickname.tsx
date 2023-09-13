import { ChangeEvent, FormEvent, useState, useCallback } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState, userInfoState } from "../../states/recoil";
import { UserInfoState } from "../../states/recoilType";

const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

const validationMessages = {
  lengthMsg: "1글자 이상 12글자 이하로 입력해 주세요.",
  specialCharMsg: "특수문자와 공백을 포함할 수 없어요",
  duplicationMsg: "사용 중인 닉네임입니다. 다시 입력해 주세요.",
};

const ChangeNickname = ({ closeModal }: { closeModal: () => void }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const token = useRecoilValue<string>(accessTokenState);
  const setUserInfo = useSetRecoilState<UserInfoState>(userInfoState);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        url: `/api/api/members/nickname-check?nickname=${inputValue}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.result) {
        return setCheckMessage(validationMessages.duplicationMsg);
      }

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

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    if (value.length < 1 || value.length > 12) {
      return setCheckMessage(validationMessages.lengthMsg);
    }

    if (!regExp.test(value)) {
      return setCheckMessage(validationMessages.specialCharMsg);
    }

    setCheckMessage(null);
  }, []);

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
            <p className="text-xs text-red-dark pt-1 h-5">
              {checkMessage && `* ${checkMessage}`}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn px-8 bg-black-primary text-white hover:bg-black ${
                checkMessage && "opacity-30"
              }`}
              disabled={checkMessage !== null}
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
