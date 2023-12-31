/// Import Dependencies ///
import React, { useState, useEffect } from "react";
import axios from "axios";

//--//

/// Import Dependencies ///
import("./App.css");
//--//
function App() {
  const [tasks, setTasks] = useState([]);

  // Get data //
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // -- //

  /// Add Note///
  const handleAdd = async () => {
    try {
      // Get input values from the form
      const title = document.getElementById("titleInput").value;
      const bodyText = document.getElementById("bodyTextInput").value;

      // Check if both title and bodyText are present
      if (!title || !bodyText) {
        alert("Please fill in both title and task fields.");
        return;
      }

      // Create a new task object
      const newTask = {
        title,
        bodyText,
      };

      await axios.post("http://localhost:4000/create", newTask);
      console.log(newTask);

      // After successful addition, fetch updated data
      fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  //--//

  /// Delete Note ///
  const handleDelete = async (taskId) => {
    try {
      // Make a DELETE request to your backend endpoint to delete the task
      await axios.delete(`http://localhost:4000/delete/${taskId}`);
      // After successful deletion, fetch updated data
      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  //--//

  return (
    <>
      <body>
        <section className="app__container">
          <h1>Task List</h1>
          <form className="inputs">
            <div className="inputs__title">
              <p>Input title here</p>
              <input type="text" required></input>
            </div>
            <div className="inputs__body">
              <p>Type task here</p>
              <input type="input__body" required></input>
            </div>
            <button onClick={handleAdd} type="submit">
              Add Note
            </button>
          </form>
        </section>

        {tasks.map((task) => (
          <div key={task._id} className="note__container">
            <p className="note__title">{task.title} </p>
            <p className="note__body">{task.bodyText}</p>
            <button
              className="btn__delete"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </body>
    </>
  );
}

export default App;
