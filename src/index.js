/* eslint-disable no-extra-boolean-cast */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosGet = (
  url,
  options = {
    abortCondition: false,
    dependencyParams: [],
    processor: (value) => value,
    outputData: undefined, // used for caching the response
    handler: axios,
    config: {},
    fetchLatency: 0,
    shouldHandleNextUrl: false,
  }
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    config,
    dependencyParams,
    abortCondition,
    processor,
    outputData,
    handler,
    fetchLatency,
    shouldHandleNextUrl,
  } = options;

  useEffect(() => {
    const axiosHandler = handler || axios;
    if (!!outputData) {
      setResponse(outputData);
    } else if (!abortCondition) {
      const fetchData = async () => {
        try {
          const res = await axiosHandler.get(url, config);
          let json = res.data;
          if (res.status !== 200) {
            if (json.errors) {
              throw new Error(Object.values(json.errors));
            } else {
              throw new Error("Error occured with API call");
            }
          }

          if (shouldHandleNextUrl && json.results && json.next) {
            while (json.next) {
              const resInner = await axiosHandler.get(json.next, config);
              const jsonInner = resInner.data;
              if (resInner.status !== 200) {
                if (jsonInner.errors) {
                  throw new Error(Object.values(jsonInner.errors));
                } else {
                  throw new Error("Error occured with API call");
                }
              }
              jsonInner.results = [...json.results, ...jsonInner.results];
              json = jsonInner;
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
      setIsLoading(true);
      setTimeout(() => {
        fetchData();
      }, fetchLatency || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abortCondition, ...(dependencyParams || [])]);
  return [response, error, isLoading];
};

export default useAxiosGet;
