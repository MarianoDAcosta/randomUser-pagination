import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://randomuser.me/api");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        const user = data.results[0];
        const userInfo = {
          name: user.name,
          thumbnail: user.picture.thumbnail,
        };
        setUserData(JSON.stringify(userInfo, null, 2) || "No user data");
        setUsers((prevUsers) => [...prevUsers, user]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [count]);

  const loadNextUser = () => {
    setCount(count + 1);
  };

  const loadPrevUser = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{count}</p>
        <div>
          <button onClick={() => setCount(count - 1)} disabled={count === 0}>
            Decrement
          </button>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
        <h1>Random user information</h1>
        {users.length > 0 && (
          <ul>
            <li>{`${users[count].name.first} ${users[count].name.last} `}</li>
            <img src={users[count].picture.thumbnail} alt="thumbnail" />
          </ul>
        )}
        <div>
          <button onClick={loadPrevUser} disabled={count === 0}>
            Load previous user
          </button>
          <button onClick={loadNextUser}>Load next user</button>
        </div>
        <p>{count + 1}</p>
      </header>
    </div>
  );
}

export default App;
