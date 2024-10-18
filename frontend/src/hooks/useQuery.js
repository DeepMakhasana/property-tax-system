import { useEffect, useState } from "react";
import { Axios } from "../utils/axios";

const useQuery = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => console.log(`${url} Query error: `, error))
      .finally(() => setIsLoading(false));
  }, []);
  return { data, isLoading };
};

export default useQuery;
