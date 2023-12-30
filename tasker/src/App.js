import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>

      {tasks.map((task, index) => (
        <>
          <div>
            <li key={index}>{task.title}</li>
            <p key={index}>{task.bodyText}</p>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
