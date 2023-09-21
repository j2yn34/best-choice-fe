import axios from "axios";
import { useInfiniteQuery } from "react-query";

const getPosts = async ({
  token,
  currentSort,
  pageParam = 0,
}: {
  token: string;
  currentSort: string;
  pageParam: number;
}) => {
  const apiUrl = token
    ? `/api/api/posts/my?sort=${currentSort}&page=${pageParam}`
    : `/api/posts?sort=${currentSort}&page=${pageParam}`;
  const auth = token || "";

  try {
    const response = await axios({
      method: "get",
      url: apiUrl,
      headers: { Authorization: `Bearer ${auth}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("데이터를 불러오는 중 오류 발생");
  }
};

export const useInfinitePosts = ({
  token,
  currentSort,
}: {
  token: string;
  currentSort: string;
}) => {
  const CONTENTS_LENGTH = 10;

  return useInfiniteQuery(
    `${currentSort}posts`,
    ({ pageParam = 0 }) => getPosts({ token, currentSort, pageParam }),
    {
      getNextPageParam: (lastPage, viewPages) => {
        if (lastPage.content.length < CONTENTS_LENGTH) {
          return null;
        }
        return viewPages.length;
      },
    }
  );
};
