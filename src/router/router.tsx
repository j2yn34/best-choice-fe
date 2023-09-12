import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
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
import ChatRoom from "../components/chat/ChatRoom";
import Header from "../components/common/Header";
import ErrorPage from "../views/ErrorPage";
import Footer from "../components/common/Footer";

const Router = (): JSX.Element => {
  const location = useLocation();
  const chatPage = ["/chat/"];
  const hideHeaderFooter = chatPage.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main
        className={`${
          !hideHeaderFooter
            ? "main pt-12 md:pt-20 pb-24 px-4 md:px-12 mx-auto xl:container"
            : ""
        }`}
      >
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Suspense
            fallback={
              <span className="flex mx-auto loading loading-spinner loading-md text-gray/[0.2]"></span>
            }
          >
            <AllRoutes />
          </Suspense>
        </ErrorBoundary>
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const AllRoutes = () => {
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
      <Route path="/chat/:postId" element={<ChatRoom />} />
    </Routes>
  );
};

export default Router;
