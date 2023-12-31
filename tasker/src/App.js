/// Import Dependencies ///
import React, { useState, useEffect } from "react";
import axios from "axios";

//--//

/// Import Files ///
import "./App.css";
//--//
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskBody, setTaskBody] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

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
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log("taskTitle:", taskTitle);
    console.log("taskBody:", taskBody);
    try {
      let result = await fetch("http://localhost:4000/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskTitle,
          taskBody,
        }),
      });

      if (result.ok) {
        result = await result.json();
        localStorage.setItem("tender", JSON.stringify(result));
        console.log("Data has been sent to mongo", result);
        alert("Tender has been submited");

        // Redirect the user to user page

        window.location.href = "http://localhost:3000/";
      } else {
        console.error("Error submitting the form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //--//

  /// Delete Note ///
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${taskId}`);

      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  //--//

  /// Edit Notes //
  let handleEdit = (taskId) => {
    setEditMode(true);
    setEditTaskId(taskId);

    // Fetch the existing note data and set it in the input fields
    const existingTask = tasks.find((task) => task._id === taskId);
    setTaskTitle(existingTask.title);
    setTaskBody(existingTask.bodyText);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`http://localhost:4000/update/${editTaskId}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskTitle,
          taskBody,
        }),
      });

      if (result.ok) {
        const updatedTask = await result.json();
        console.log("Data has been updated in mongo", updatedTask);
        alert("Note has been updated");

        // Reset form and exit edit mode
        setEditMode(false);
        setEditTaskId(null);
        setTaskTitle("");
        setTaskBody("");

        // Fetch updated data without reloading the page
        fetchData();
      } else {
        console.error("Error updating the note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editCancel = () => {
    setEditMode(false);
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
              <input
                type="text"
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              ></input>
            </div>
            <div className="inputs__body">
              <p>Type task here</p>
              <input
                type="input__body"
                onChange={(e) => setTaskBody(e.target.value)}
                required
              ></input>
            </div>
            <button onClick={handleAdd} type="submit">
              Add Note
            </button>
          </form>
        </section>

        <form className="inputs" onSubmit={editMode ? handleUpdate : handleAdd}>
          {/* ... */}
        </form>

        {tasks.map((task) => (
          <div key={task._id} className="note__container">
            {editMode ? (
              <input value={task.title}></input>
            ) : (
              <p className="note__title">{task.title}</p>
            )}
            {editMode ? (
              <input value={task.bodyText}></input>
            ) : (
              <p className="note__body">{task.bodyText}</p>
            )}

            {editMode ? (
              <button className="btn__edit" onClick={editCancel}>
                Cancel
              </button>
            ) : (
              <button
                className="btn__edit"
                onClick={() => handleEdit(task._id)}
              >
                Edit
              </button>
            )}
            {editMode ? (
              <button
                type="submit"
                className="btn__delete"
                onClick={handleUpdate}
              >
                Update Note
              </button>
            ) : (
              <button
                className="btn__delete"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </body>
    </>
  );
}

export default App;
