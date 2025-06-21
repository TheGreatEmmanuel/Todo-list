import { useState } from "react";
import logo from "./logo.svg";
import { MdDelete } from "react-icons/md";
import { BsCheckSquareFill } from "react-icons/bs";
import "./App.css";

function App() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTodo = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Both Title and Description are required!");
      return;
    }
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    setNewTitle("");
    setNewDescription("");
  };

  const handleADeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let completedItem = {
      ...allTodos[index],
      completedAt: new Date().toLocaleString(),
    };
    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setCompletedTodos([...completedTodos, completedItem]);
  };

  return (
    <>
      <h1 className="myto">My Todos</h1>

      {/* Wrap all content in a single div with id='all-mid' */}
      <div id="all-mid">
        <div className="form">
          <label className="tit">Title:</label>
          <input
            className="inputone"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What's the task's title?"
            required
          />
          <label className="des">Description:</label>
          <input
            className="inputtwo"
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="What's the task's description?"
            required
          />
        </div>

        <div>
          <button className="add" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        <div className="btn-sec">
          <button className="todo" onClick={() => setShowCompleted(false)}>
            Todo
          </button>
          <button className="completed" onClick={() => setShowCompleted(true)}>
            Completed
          </button>
        </div>

        {/* Display Pending Todos */}
        {!showCompleted && (
          <div>
            {allTodos.length === 0 ? (
              <h2 className="pending">No pending Tasks......</h2>
            ) : (
              allTodos.map((item, index) => (
                <div className="alltodos" key={index}>
                  <div>
                    <h3 className="alltodos-title">{item.title}</h3>
                    <p className="alltodos-description">{item.description}</p>
                  </div>

                  <MdDelete
                    className="icondelete"
                    onClick={() => handleADeleteTodo(index)}
                    title="Delete?"
                  />
                  <BsCheckSquareFill
                    className="iconcheck"
                    onClick={() => handleComplete(index)}
                    title="Complete?"
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* Display Completed Todos */}
        {showCompleted && (
          <div>
            <h2 className="completed-task"></h2>
            {completedTodos.length === 0 ? (
              <h2 className="no-completed">No completed tasks......</h2>
            ) : (
              completedTodos.map((item, index) => (
                <div className="completed-item" key={index}>
                  <h3 className="completed-title">{item.title}</h3>
                  <p className="completed-description">{item.description}</p>
                  <p className="completed-at">
                    <>Completed At:</> {item.completedAt}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
