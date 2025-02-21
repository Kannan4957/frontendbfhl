import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [jsonInput, setJsonInput] = useState('{"data": ["A","C","z"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://bhfl-ebon.vercel.app/bfhl", 
        { data: parsedInput },  // ✅ Ensure the correct payload format
        { headers: { "Content-Type": "application/json" } } // ✅ Ensure proper headers
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or server error.");
      setResponse(null);
      console.log(err);
    }
};


  return (
    <div className="container">
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <label>Filter Response:</label>
          <select
            multiple
            value={selectedOptions}
            onChange={(e) =>
              setSelectedOptions(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <div className="response">
            {selectedOptions.includes("alphabets") && (
              <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
            )}
            {selectedOptions.includes("numbers") && (
              <p>Numbers: {JSON.stringify(response.numbers)}</p>
            )}
            {selectedOptions.includes("highest_alphabet") && (
              <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

