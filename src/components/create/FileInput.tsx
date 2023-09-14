import { ChangeEvent, useState } from "react";
import { RecoilState, useSetRecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import BasicModal from "../modal/BasicModal";

const maxFileCnt = 5;
const maxFileSize = 1024 * 1024 * 100;

const FileInput = () => {
  let filesSize = 0;

  const [media, setMedia] = useState<{
    images: string[] | null;
    videos: string[] | null;
  }>({
    images: null,
    videos: null,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const setInputValue = useSetRecoilState(
    inputValueState as RecoilState<InputValue>
  );
  const [modalMessage, setModalMessage] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const processFiles = (files: FileList) => {
    if (files && files?.length > maxFileCnt) {
      setModalMessage(`파일 업로드는 최대 ${maxFileCnt}까지만 가능합니다.`);
      openModal();

      setInputValue((prevInputValues) => ({
        ...prevInputValues,
        imageFile: null,
        videoFile: null,
      }));

      return;
    }

    const newMedia: { images: string[]; videos: string[] } = {
      images: [],
      videos: [],
    };

    if (files) {
      const imageFileList: File[] | null = [];
      const videoFileList: File[] | null = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        filesSize = filesSize + file.size;
        const url = URL.createObjectURL(file);

        if (file.type.includes("video")) {
          newMedia.videos.push(url);
          videoFileList.push(file);
        } else {
          newMedia.images.push(url);
          imageFileList.push(file);
        }
      }

      if (filesSize > maxFileSize) {
        setModalMessage("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.");
        openModal();
        return;
      }

      setInputValue((prevInputValues) => ({
        ...prevInputValues,
        imageFile: imageFileList,
        videoFile: videoFileList,
      }));
    }

    setMedia(newMedia);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setMedia({ images: null, videos: null });
      processFiles(files);
    }
  };

  return (
    <>
      <div className="flex items-center text-lg mb-4 mt-6">
        <p>파일 첨부</p>
        <p className="ml-2 text-xs text-gray">(최대 5개 업로드 가능)</p>
      </div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-color-bg file:text-black"
      />
      <div className="flex items-center md:gap-5 mt-3 gap-1">
        {media.images?.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`이미지-${index}`} width={300} />
          </div>
        ))}
        {media.videos?.map((video, index) => (
          <div key={index}>
            <video controls width={300}>
              <source src={video} />
              `동영상-${index}`
            </video>
          </div>
        ))}
      </div>
      {showModal ? (
        <BasicModal
          message={modalMessage}
          closeModal={closeModal}
          confirm={closeModal}
        />
      ) : null}
    </>
  );
};

export default FileInput;
