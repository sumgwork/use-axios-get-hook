import React, { useState } from "react";
import useAxiosGet from "use-axios-get-hook";
import axios from "axios";

// To showcase the concept of handler in the example
const httpService = {
  get: axios.get,
  post: axios.post,
};

const commonStyle = {
  marginBottom: 8,
};

export default function App() {
  const [refetchCount, setRefetchCount] = useState(0);
  const [response, error, loading] = useAxiosGet(
    "https://jsonplaceholder.typicode.com/todos",
    {
      config: {
        method: "GET",
        headers: {
          header1: "abc",
        },
      },
      dependencyParams: [refetchCount],
      fetchLatency: 100,
      handler: httpService,
    }
  );
  return (
    <div>
      <h1>Use Axios Get Hook</h1>
      <button
        onClick={() => {
          setRefetchCount((prevState) => prevState + 1);
        }}
        style={commonStyle}
      >
        Refetch
      </button>
      {refetchCount > 0 && (
        <div style={commonStyle}>Refetched {refetchCount} times</div>
      )}
      {loading && <div>Loading...</div>}
      {!loading && error && <div>{error.message}</div>}
      {!loading && !error && response && (
        <div>
          <h2>Fetch Complete</h2>
          <pre>{JSON.stringify(response, undefined, 2)}</pre>
        </div>
      )}
    </div>
  );
}
