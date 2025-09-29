import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Use live backend or fallback to localhost for testing
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Delete function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (deleteTodo.ok) {
        setTodos(todos.filter((todo) => todo.todo_id !== id));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Get all todos
  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
