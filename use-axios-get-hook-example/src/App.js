import React from "react";
import useAxiosGet from "use-axios-get-hook";

const App = () => {
  const [response, error, loading] = useAxiosGet(
    "https://jsonplaceholder.typicode.com/todos"
  );

  return (
    <div>
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
};
export default App;
