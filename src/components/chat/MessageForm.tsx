import { FormEvent, ChangeEvent } from "react";

const MessageForm = ({
  message,
  submitMsg,
  changeMsg,
}: {
  message: string;
  submitMsg: (e: FormEvent<HTMLElement>) => void;
  changeMsg: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}): JSX.Element => {
  return (
    <>
      <form
        className="flex items-center justify-between gap-4 p-5 bg-white"
        onSubmit={(e) => submitMsg(e)}
      >
        <textarea
          value={message}
          rows={3}
          className="w-full p-2 bg-color-bg focus:outline-none"
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
