import { useState } from "react";
import { Axios } from "../utils/axios";

const useMutation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (url, payload) => {
    setLoading(true);
    // Axios.post(url, payload)
    //   .then((data) => {
    //     console.log(data);
    //     setData(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    try {
      const res = await Axios.post(url, payload);
      console.log(res);
      setData(res);
      return res;
    } catch (error) {
      console.log("error", error);
      setError(error);
      return error;
    } finally {
      setLoading(false);
    }
  };
  return {
    mutate,
    data,
    loading,
    error,
  };
};

export default useMutation;
