import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRecoilValue } from "recoil";
import { accessTokenState, newNotificationState } from "../../states/recoil";

const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const newNotice = useRecoilValue<boolean>(newNotificationState);

  const leftMenus = [
    { name: "posts", title: "투표글" },
    { name: "hot", title: "HOT" },
    { name: "chat", title: "채팅방" },
    { name: "search", title: "검색" },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const token = useRecoilValue<string>(accessTokenState);

  return (
    <>
      <header className="sticky top-0 w-full bg-white flex items-center h-[70px] shadow-md z-40">
        <div className="w-full xl:container px-4 md:px-12 md:mx-auto flex flex-row justify-between">
          <nav>
            <div className="md:hidden flex items-center">
              <button
                className={`${isMenuOpen ? "hidden" : ""} text-2xl mr-6`}
                onClick={handleMenuToggle}
              >
                <RxHamburgerMenu />
              </button>
              <Link to="/" className="mr-8">
                <img src="/logo.png" className="w-16" alt="로고" />
              </Link>
            </div>
            <div
              className={`hidden md:flex items-center ${
                isMenuOpen ? "hidden" : ""
              }`}
            >
              <Link to="/" className="mr-8">
                <img src="/logo.png" className="w-16" alt="로고" />
              </Link>
              {leftMenus.map((menu) => (
                <Link
                  to={`/${menu.name}`}
                  key={menu.name}
                  className={`text-base mr-6 ${
                    menu.name === "hot" ? "font-bold" : ""
                  }`}
                >
                  {menu.title}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex flex-row items-center">
            <Link
              to="/notification"
              className={`indicator text-2xl ${token ? "" : "hidden"}`}
            >
              {newNotice && (
                <span className="indicator-item badge badge-sm bg-blue border-white"></span>
              )}
              <IoMdNotificationsOutline />
            </Link>
            {token ? (
              <Link to="/member" className="text-base ml-5 font-bold">
                MY
              </Link>
            ) : (
              <Link to="/login" className="text-base ml-5 font-bold">
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 w-full h-full bg-black/[0.8] z-50"
            onClick={handleMenuToggle}
          ></div>
          <div className="fixed inset-0 flex flex-col w-64 h-full bg-white z-50">
            {leftMenus.map((menu) => (
              <Link
                to={`/${menu.name}`}
                key={menu.name}
                className={`text-base p-4 hover:bg-blue-100 ${
                  menu.name === "hot" ? "font-bold" : ""
                }`}
                onClick={handleMenuToggle}
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
