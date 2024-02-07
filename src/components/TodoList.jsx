import React from 'react';
import './TodoList.scss'; 

const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo }) => {
  return (
    <div className="todo-list-container"> 
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item"> 
          <h1 className="todo-task">{todo.task}</h1> 
          <div className="button-container"> 
            <button className="update-button" type="button" onClick={() => handleUpdateTodo(todo.id)}>
              Update
            </button>
            <button className="delete-button" type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
