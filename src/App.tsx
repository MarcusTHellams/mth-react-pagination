import { useMthPagination } from '../lib';

function App() {
  const pagination = useMthPagination({
    page: 1,
    total: 10,
    onChange(page) {
      console.log(page);
    },
  });

  return (
    <div>
      <h1>Page: {pagination.activePage}</h1>
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
