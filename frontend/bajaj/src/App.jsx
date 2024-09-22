import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const { data } = await axios.post('https://bajaj-backend-xzif.onrender.com/bfhl', parsedInput);
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or server error');
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder='Enter JSON (e.g., {"data": ["A", "1", "z"]})'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
     
      {response && (
        <div>
          <h3>Filters</h3>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleFilterChange}
            />
            Highest Lowercase Alphabet
          </label>
          <div>
            <h3>Response</h3>
            {filter.includes('alphabets') && (
              <div>Alphabets: {response.alphabets.join(', ')}</div>
            )}
            {filter.includes('numbers') && (
              <div>Numbers: {response.numbers.join(', ')}</div>
            )}
            {filter.includes('highest_lowercase_alphabet') && (
              <div>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

