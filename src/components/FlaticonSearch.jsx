import React, { useState } from 'react';

const FREEPIK_API_KEY = 'FPSX5f1ed7f833522d77cbd0f18a25d6368a';
const FREEPIK_API_URL = 'https://api.freepik.com/v1/resources';

const FlaticonSearch = ({ selectedIcons, onIconSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`${FREEPIK_API_URL}/?term=${encodeURIComponent(query)}&type=vector&limit=24`, {
        headers: {
          'Accept': 'application/json',
          'x-freepik-api-key': FREEPIK_API_KEY
        }
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      setError('Failed to fetch icons.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (icon) => {
    if (selectedIcons.some(i => i.id === icon.id)) {
      onIconSelect(selectedIcons.filter(i => i.id !== icon.id));
    } else {
      onIconSelect([...selectedIcons, icon]);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
  <label className="block text-sm font-medium text-gray-700 mb-2">Search Freepik Vectors</label>
      <form onSubmit={handleSearch} className="flex gap-2 mb-3">
        <input
          className="flex-1 border border-blue-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search icons..."
        />
        <button type="submit" className="button">Search</button>
      </form>
      {loading && <div className="text-blue-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-6 gap-2 mt-2">
        {results.map(vector => (
          <button
            key={vector.id}
            onClick={() => handleToggle(vector)}
            className={`p-2 rounded-lg border hover:bg-blue-100 transition-all duration-200 focus:outline-none ${selectedIcons.some(i => i.id === vector.id) ? 'ring-2 ring-indigo-500 bg-indigo-100' : ''}`}
            title={vector.title || vector.id}
          >
            {console.log("vector", vector)}
            <img src={vector.image?.source?.url || ''} alt={vector.title || 'vector'} className="w-8 h-8 mx-auto" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlaticonSearch;
