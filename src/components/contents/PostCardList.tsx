import { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import NoDataMessage from "../common/NoDataMessage";

const PostCardList = ({
  limit,
  sort,
  token,
}: {
  limit: number | null;
  sort: string;
  token: string;
}) => {
  const { data, fetchNextPage, hasNextPage } = useInfinitePosts({
    token,
    currentSort: sort,
  });
  const [isBottom, setIsBottom] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }, options);

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isBottom && hasNextPage) {
      fetchNextPage();
      setIsBottom(false);
    }
  }, [isBottom, hasNextPage, fetchNextPage]);

  if (!data || data.pages.length <= 0) {
    return <NoDataMessage message="투표글 데이터가 없어요" />;
  }

  const viewPosts = data.pages.flatMap((page) => page.content);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
      {limit === null
        ? viewPosts.map((post) => <PostCard Data={post} key={post.postId} />)
        : viewPosts
            .slice(0, limit)
            .map((post) => <PostCard Data={post} key={post.postId} />)}
      {hasNextPage && <div ref={bottomRef} />}
    </div>
  );
};

export default PostCardList;
