import axios from "axios";
import { useQuery } from "react-query";

const useFetchData = (url: string, key: string[]) => {
  return useQuery(key, () => {
    const fetchData = async () => {
      const response = await axios.get(url);
      return response.data["content"];
    };

    return fetchData();
  });
};

export default useFetchData;
