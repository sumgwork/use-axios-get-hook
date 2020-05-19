import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosGet = (
  url,
  options = {
    abortCondition: false,
    dependencyParams: [],
    processor: (value) => value,
    outputData: undefined, //used for caching the response
  }
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dependencyParams, abortCondition, processor, outputData } = options;
  useEffect(() => {
    if (!!outputData) {
      setResponse(outputData);
    } else if (!abortCondition) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(url);
          const json = res.data;

          if (res.status !== 200) {
            if (json.errors) {
              throw new Error(Object.values(json.errors));
            } else {
              throw new Error("Error occured with API call");
            }
          }
          if (processor) {
            setResponse(processor(json));
          } else setResponse(json);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [abortCondition, ...(dependencyParams || [])]);
  return [response, error, isLoading];
};

export default useAxiosGet;
