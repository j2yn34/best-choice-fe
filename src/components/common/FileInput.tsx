import { ChangeEvent, useState } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";

const maxFileCnt = 5;

const FileInput = () => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [showVideos, setShowVideos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files?.length > maxFileCnt) {
      alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
      return;
    }

    if (files) {
      setShowImages([]);

      for (let i = 0; i < files.length; i++) {
        if (files[i].type.includes("video")) {
          const currentVideoUrl = URL.createObjectURL(files[i]);
          setShowVideos((prevImages) => [...prevImages, currentVideoUrl]);
        } else {
          const currentImageUrl = URL.createObjectURL(files[i]);
          setShowImages((prevImages) => [...prevImages, currentImageUrl]);
        }
      }

      const fileList = Array.from(files);

      setInputValue((prevInputValues) => ({
        ...prevInputValues,
        files: fileList.slice(0, 5),
      }));
    }
  };

  return (
    <>
      <p className="text-lg mt-8">파일 첨부</p>
      <p className="mb-4 text-sm text-gray">* 최대 5개 업로드 가능</p>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-color-bg file:text-black"
      />
      <div className="flex items-center md:gap-5 mt-3 gap-1">
        {showImages.map((image, id) => (
          <div key={id}>
            <img src={image} alt={`${image}-${id}`} width={300} />
          </div>
        ))}
        {showVideos.map((video, id) => (
          <div key={id}>
            <video src={video} controls width={300} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FileInput;
