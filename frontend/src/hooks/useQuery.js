import { useEffect, useState } from "react";
import { Axios } from "../utils/axios";

const useQuery = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reFetch, setReFetch] = useState(false);

  const reFetchData = () => {
    setReFetch((pre) => !pre);
  };

  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => console.log(`${url} Query error: `, error))
      .finally(() => setIsLoading(false));
  }, [reFetch, url]);
  return { data, isLoading, reFetchData };
};

export default useQuery;
