import { MdOutlineClose } from "react-icons/md";

const BasicModal = ({
  message,
  closeModal,
  confirm,
}: {
  message: string;
  closeModal: () => void;
  confirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.8] z-50">
      <>
        <div className="flex flex-col min-w-[300px] h-fit rounded-xl bg-white z-20 py-4 px-3 mx-2">
          <button className="flex justify-end text-2xl" onClick={closeModal}>
            <MdOutlineClose />
          </button>
          <div className="flex flex-col justify-center items-center px-4 py-2 md:px-8">
            <p className="text-lg">{message}</p>
            <button
              className="btn bg-black-primary text-white hover:bg-black mt-12 px-8"
              onClick={confirm}
            >
              확인
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default BasicModal;
