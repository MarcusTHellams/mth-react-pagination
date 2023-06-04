# useMthPagination React Hook

### Overview
This is a custom hook for creating pagination logic in your React application. useMthPagination provides an easy-to-use API for generating pagination numbers, navigation, and a simple mechanism for changing pages.


### Features
- Provides a range of page numbers for pagination
- Allows customizing the number of page boundaries and sibling pages
- Includes methods for setting the current page and navigating to the next, previous, first, and last page

### Install

Using npm, yarn, or pnpm

```sh
# Yarn
yarn add @mhellams/mth-react-pagination

# NPM
npm install @mhellams/mth-react-pagination

# PNPM
pnpm add @mhellams/mth-react-pagination

```
Using CDN

```html
<html>
	<head>
		<script src="https://unpkg.com/@mhellams/mth-react-pagination"></script>
	</head>
</html>
```
### Importing

```ts
	import { useMthPagination } from '@mhellams/mth-react-pagination';
```

### Usage
```javascript
import { useState } from 'react';
import { useMthPagination } from '../lib';

function App() {
  const [page, setPage] = useState(1);

// uncontrolled
const pagination = useMthPagination({
    defaultPage: page,
    total: 10,
  });

// controlled
  const pagination = useMthPagination({
    page: page,
    total: 10,
    onChange: setPage,
  });

  return (
    <div>
      <h1>
        Page: {pagination.activePage}, Stage: {page}
      </h1>
      <div style={{ display: 'inline-flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          disabled={pagination.activePage === 1}
          onClick={() => pagination.first()}
        >
          First
        </button>
        <button
          disabled={pagination.activePage === 1}
          onClick={() => pagination.prev()}
        >
          Prev
        </button>
        {pagination.range.map((range, index) => {
          const isDot = range === 'dots';
          return (
            <button
              disabled={isDot || pagination.activePage === range}
              onClick={() => {
                if (isDot) {
                  return;
                }
                pagination.setPage(range as number);
              }}
              key={index}
            >
              {isDot ? '...' : range}
            </button>
          );
        })}
        <button
          disabled={pagination.activePage === pagination.total}
          onClick={() => pagination.next()}
        >
          Next
        </button>
        <button
          disabled={pagination.activePage === pagination.total}
          onClick={() => pagination.last()}
        >
          Last
        </button>
      </div>
      <div>
        <select
          value={pagination.activePage}
          onChange={(event) => {
            pagination.setPage(+event.target.value);
          }}
          style={{
            width: '50%',
            marginBlockStart: '1rem',
            height: '2rem',
          }}
        >
          {new Array(pagination.total).fill(1).map((_, index) => {
            return (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default App;
```
#### API
Here are the parameters that you can pass to the useMthPagination hook:

**UseMthPaginationParams**

This is the parameter object that you pass to the useMthPagination hook. It includes:

- **defaultPage**: The uncontrolled page selected on the initial render. It defaults to 1.
- **page**: The controlled active page number.
- **total**: The total amount of pages.
- **siblings**: The amount of siblings on the left and right side of the selected page. It defaults to 1.
- **boundaries**: The amount of elements visible on the left and right edges. It defaults to 1.
- **onChange**: A callback fired after the change of each page. The callback receives the new page number as an argument.

#### useMthPagination
This function returns an object with the following properties and methods:

- **activePage**: The current page number.
- **first**: A function to navigate to the first page.
- **last**: A function to navigate to the last page.
- **next**: A function to navigate to the next page.
- **prev**: A function to navigate to the previous page.
- **range**: An array of page numbers and ellipses (represented as 'dots') to be used for rendering the pagination component.
- **setPage**: A function to navigate to a specific page number. It automatically constrains the page number to the valid range of pages.
- **total**: The total amount of pages.

Please note, this hook is highly customizable and you can adjust parameters like **siblings**, **boundaries**, etc., based on your specific pagination requirements.

### Example
[Live Example](https://stackblitz.com/edit/vitejs-vite-zkfyzk?file=src%2FApp.tsx"Live Example")

### License
This project is licensed under the MIT License.