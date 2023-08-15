import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = (): JSX.Element => {
  const leftMenus = [
    { name: "posts", title: "투표글" },
    { name: "hot", title: "HOT" },
    { name: "chat", title: "채팅방" },
    { name: "search", title: "검색" },
  ];

  return (
    <div className="w-ful bg-white flex flex-row items-center h-[70px] shadow-md">
      <div className="xl:container mx-auto flex flex-row justify-between">
        <div>
          <Link to="/" className="mr-10">
            로고
          </Link>
          {leftMenus.map((menu) => (
            <Link
              to={`/${menu.name}`}
              key={menu.name}
              className={`text-base mr-6 ${
                menu.name === "hot" ? "font-semibold" : ""
              }`}
            >
              {menu.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center">
          <Link to="/notification" className="text-2xl ml-6">
            <IoMdNotificationsOutline />
          </Link>
          <Link to="/member" className="text-base ml-6">
            회원페이지
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
