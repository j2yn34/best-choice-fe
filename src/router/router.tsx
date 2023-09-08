import { Routes, Route } from "react-router-dom";
import MainPage from "../views/MainPage";
import PostListPage from "../views/PostListPage";
import HotListPage from "../views/HotListPage";
import ChatListPage from "../views/ChatListPage";
import SearchPage from "../views/SearchPage";
import PostDetailPage from "../views/PostDetailPage";
import CreatePostPage from "../views/CreatePostPage";
import MemberPage from "../views/MemberPage";
import NotificationPage from "../views/NotificationPage";
import LoginPage from "../views/LoginPage";
import NotFoundPage from "../views/NotFoundPage";
import LoginRedirectPage from "../views/LoginCallbackPage";
import Chat from "../components/chat/Chat";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/callback" element={<LoginRedirectPage />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/hot" element={<HotListPage />} />
      <Route path="/chat" element={<ChatListPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/member" element={<MemberPage />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/chat/:postId" element={<Chat />} />
    </Routes>
  );
};

export default Router;
