import { FormEvent, ChangeEvent } from "react";

const MessageForm = ({
  message,
  submitMsg,
  changeMsg,
}: {
  message: string;
  submitMsg: (e: FormEvent<HTMLElement>) => void;
  changeMsg: (e: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  return (
    <>
      <form
        className="flex items-center justify-between p-1 bg-white"
        onSubmit={(e) => submitMsg(e)}
      >
        <input
          type="text"
          value={message}
          className="w-full p-2 focus:outline-none"
          onChange={(e) => changeMsg(e)}
        />
        <button className="btn bg-black-primary hover:bg-black text-white">
          전송
        </button>
      </form>
    </>
  );
};

export default MessageForm;
