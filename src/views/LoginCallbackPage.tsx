import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accessTokenState } from "../states/recoil";
import { useSetRecoilState } from "recoil";
import BasicModal from "../components/modal/BasicModal";

const LoginCallbackPage = () => {
  const setAccessToken = useSetRecoilState<string>(accessTokenState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get("token");

    if (token) {
      setIsLoading(false);
      setAccessToken(token);
      navigate("/");
      alert("반가워요! 로그인 되었어요.");
    } else {
      setIsLoading(false);
      setShowModal(true);
    }
  }, [navigate, setAccessToken]);

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    navigate("/login");
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <span className="flex mx-auto loading loading-spinner loading-md text-gray/[0.2]"></span>
        </div>
      ) : (
        <div>
          {showModal ? (
            <BasicModal
              message="로그인을 다시 시도해 주세요"
              closeModal={closeModal}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default LoginCallbackPage;
