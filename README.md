# use-axios-get-hook

> React custom hook for using Axios fetch call

[![NPM](https://img.shields.io/npm/v/@sgovil/use-axios-get-hook)](https://www.npmjs.com/package/@sgovil/use-axios-get-hook)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![demo site](https://img.shields.io/badge/demo-site-green)](https://sumgwork.github.io/use-axios-get-hook/)

## Install

```bash
npm install --save axios use-axios-get-hook
```

## Usage

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

## License

MIT © [sumgwork](https://github.com/sumgwork)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
