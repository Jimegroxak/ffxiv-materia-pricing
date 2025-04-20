import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((response) => {
        setData(response.data)
      }).catch((error) => {
        console.error("Error: ", error)
      })
  }, [])

  return (
    <div>
      <h1>Data from backend</h1>
      <ul>
        {data.map((entry) => (
          <li key={entry.name}>{entry.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
