import { ChangeEvent, useState } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import BasicModal from "../modal/BasicModal";

const maxFileCnt = 5;

const FileInput = () => {
  const [media, setMedia] = useState<{
    images: string[] | null;
    videos: string[] | null;
  }>({
    images: null,
    videos: null,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

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
      openModal();

      setInputValue((prevInputValues) => ({
        ...prevInputValues,
        files: null,
      }));

      return;
    }

    const newMedia: { images: string[]; videos: string[] } = {
      images: [],
      videos: [],
    };

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);

        if (file.type.includes("video")) {
          newMedia.videos.push(url);
        } else {
          newMedia.images.push(url);
        }
      }

      const fileList = Array.from(files);

      setInputValue((prevInputValues) => ({
        ...prevInputValues,
        files: fileList,
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
      <div className="flex items-center text-lg mb-4 mt-8">
        <p>파일 첨부</p>
        <p className="ml-2 text-xs text-gray">* 최대 5개 업로드 가능</p>
      </div>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-color-bg file:text-black"
      />
      <div className="flex items-center md:gap-5 mt-3 gap-1">
        {media.images?.map((image, id) => (
          <div key={id}>
            <img src={image} alt={`${image}-${id}`} width={300} />
          </div>
        ))}
        {media.videos?.map((video, id) => (
          <div key={id}>
            <video src={video} controls width={300} />
          </div>
        ))}
      </div>
      {showModal ? (
        <BasicModal
          message={`파일 업로드는 최대 ${maxFileCnt}까지만 가능합니다. `}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

export default FileInput;
