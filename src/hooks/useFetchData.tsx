import axios from "axios";
import { useQuery } from "react-query";

const useFetchData = (url: string, key: string[], auth: string) => {
  return useQuery(key, () => {
    const fetchData = async () => {
      const response = await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer  ${auth}` },
        responseType: "json",
      });
      return response.data["content"];
    };
    return fetchData();
  });
};

export default useFetchData;
