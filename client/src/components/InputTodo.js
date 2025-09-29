import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  // Use live backend or fallback to localhost for testing
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // If request succeeded, clear input
      if (response.ok) {
        setDescription("");
        window.location = "/";
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo App</h1>

      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          placeholder="Enter your task"
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
