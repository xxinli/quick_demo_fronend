import React from 'react';
import './styles.css';

// courtesy of https://www.smashingmagazine.com/2020/03/sortable-tables-react/
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export const CompanyTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.items);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>Company</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('unique_symbol')}
              className={getClassNamesFor('unique_symbol')}
            >
              Symbol
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('exchange_symbol')}
              className={getClassNamesFor('exchange_symbol')}
            >
              Exchange Symbol
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price')}
            >
              Price
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('total')}
              className={getClassNamesFor('total')}
            >
              Score
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.unique_symbol}</td>
            <td>{item.exchange_symbol}</td>
            <td>${item.price}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};