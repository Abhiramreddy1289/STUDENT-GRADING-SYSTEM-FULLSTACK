import React, { useState, useEffect } from 'react';
import { IconSearch, IconSwapVertical } from './Icons';

const Table = ({ data, columns, searchKey = 'name', onRowClick }) => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    let filtered = data.filter(row =>
      row[searchKey]?.toLowerCase().includes(search.toLowerCase()) ||
      row.id?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setDisplayData(filtered);
  }, [data, search, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatCell = (value, col) => {
    if (col.type === 'grade') {
      const color = value === 'F' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
      return <span className={`px-2 py-1 rounded-full text-xs font-bold ${color}`}>{value}</span>;
    }
    return value;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="bg-white px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <IconSwapVertical className="w-3 h-3 opacity-50" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td 
                    key={col.key} 
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    data-label={col.label}
                  >
                    {formatCell(row[col.key], col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {displayData.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No data found matching your search.
        </div>
      )}
    </div>
  );
};


export default Table;
