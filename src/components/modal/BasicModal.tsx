import { MdOutlineClose } from "react-icons/md";

const BasicModal = ({
  message,
  closeModal,
}: {
  message: string;
  closeModal: () => void;
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/[0.8]"></div>
        <>
          <div className="flex flex-col max-w-[360px] min-w-[300px] rounded-xl bg-white z-20 py-3 px-8 mx-2">
            <button className="flex justify-end text-2xl" onClick={closeModal}>
              <MdOutlineClose />
            </button>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl mt-5">{message}</p>
              <button
                className="btn bg-black-primary text-white hover:bg-black mt-10 mb-4"
                onClick={() => {
                  closeModal();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default BasicModal;
