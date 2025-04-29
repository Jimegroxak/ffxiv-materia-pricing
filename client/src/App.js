import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [dataCenter, setDataCenter] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/', {
      params: {
        dcName: dataCenter
      }
    })
      .then((response) => {
        setData(response.data)
      }).catch((error) => {
        console.error("Error: ", error)
      })
  }, [dataCenter])

  return (
    <div>
      <header>
        <h1>Realm Reborn Zodiac Weapon Shopping Assistant</h1>
        <h2>{dataCenter}</h2>
        <button onClick={() => setDataCenter("Aether")}>Aether</button>
        <button onClick={() => setDataCenter("Primal")}>Primal</button>
        <button onClick={() => setDataCenter("Crystal")}>Crystal</button>
        <button onClick={() => setDataCenter("Dynamis")}>Dynamis</button>
      </header>
      <ul>
        {data.map((entry) => (
          <li key={entry.name}>
            <div>
              {entry.name}:
              <ul>
                <li>{entry.minListingDC.price}</li>
                <li>{entry.minListingDC.worldName}</li>
              </ul>
            </div>
          </li>
          //<li key={entry.name}>{entry.minListingDC.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
