import styled from "styled-components";
import { IoMdArrowRoundUp } from "react-icons/io";

const TopBtn = styled.button`
  position: fixed;
  bottom: 0px;
  right: 30px;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  text-align: center;
  color: #1c1c1c;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 40;
  @media (min-width: 1344px) {
    left: 50%;
    transform: translateX(582px) translateY(-50%);
  }
`;

const ScrollTopBtn = (): JSX.Element => {
  const handleClick = () => {
    if (!window.scrollY) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <TopBtn onClick={handleClick}>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            <IoMdArrowRoundUp />
          </div>
          <span className="text-sm tracking-wide">TOP</span>
        </div>
      </TopBtn>
    </>
  );
};

export default ScrollTopBtn;
