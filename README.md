# use-axios-get-hook

> React custom hook for using Axios fetch call

[![NPM](https://img.shields.io/npm/v/use-axios-get-hook)](https://www.npmjs.com/package/use-axios-get-hook)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save axios use-axios-get-hook
```

## Usage

### Standard

```jsx
import React from "react";
import useAxiosGet from "use-axios-get-hook";

export default function App() {
  const [response, error, loading] = useAxiosGet(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return (
    <div>
      <h1>Use Axios Get Hook</h1>

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
```

### With Options

```jsx
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
```

## API Options

| option           | description                                                                                                                                                                                                              | default          | example                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | --------------------------------------------------------- |
| config           | Configuration for API call like method, data, headers etc.                                                                                                                                                               | {}               | { config: { headers: { headers1: "abc" } } }              |
| dependencyParams | Array of parameters which cause the API call to happen again                                                                                                                                                             | []               | { dependencyParams: [count] }                             |
| abortCondition   | A boolean expression which when false terminates the API call                                                                                                                                                            | false            | { abortCondition: x < 1 }                                 |
| processor        | A function which can execute on response data before returning the result. Should mandatorily return a value.                                                                                                            | (value) => value | { processor: response => response.map(row => row.count) } |
| outputData       | If for any reason you want the API call not to happen but the hook to still return specific data, pass that data with this outputData param and the hook will behave as if the response is coming as result of API call. | undefined        | { outputData: data }                                      |
| fetchLatency     | Initial delay (in milliseconds) for the fetch to remove flicker from the UI. Loading will be set to true during this initial delay.                                                                                      | 0                | { fetchLatency: 200 }                                     |
| handler          | The axios handler if default handler is not to be used. Useful when intercepting requests or responses.                                                                                                                  | axios            | { handler: httpService }                                  |

## License

MIT © [sumgwork](https://github.com/sumgwork)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
