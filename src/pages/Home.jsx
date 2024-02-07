import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  setTodos,
} from "../store/reducers/todoSlice";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./Home.scss";
import { db } from "../Firebase.config";
import TodoList from "../components/TodoList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [task, setTask] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [localTodos, setLocalTodos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocalTodos(todosData);
    });

    return () => {
      unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []);

  useEffect(() => {
    dispatch(setTodos(localTodos));
  }, [localTodos, dispatch]);

  const handleTaskInput = (e) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = async () => {
    if (task.trim() !== "") {
      try {
        if (selectedTodoId) {
          await updateDoc(doc(db, "todos", selectedTodoId), { task: task });
          dispatch(updateTodo({ id: selectedTodoId, task }));
          setSelectedTodoId(null);
          toast.success("Task updated successfully");
        } else {
          const docRef = await addDoc(collection(db, "todos"), { task: task });
          dispatch(addTodo({ id: docRef.id, task }));
          toast.success("Task added successfully");
        }
        console.log("Task added/updated:", task);
        setTask("");
      } catch (error) {
        console.error("Error adding/updating task:", error);
        toast.error("Error adding/updating task");
      }
    } else {
      toast.error("Add Task/cannot add empty field");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(collection(db, "todos"), id));
      dispatch(deleteTodo(id));
      console.log("Deleted task with id:", id);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };

  const handleUpdateTodo = async (id) => {
    setSelectedTodoId(id);
    const todo = localTodos.find((todo) => todo.id === id);
    setTask(todo.task);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App CRUD</h1>
      <input
        type="text"
        id="todoInput"
        placeholder="Enter task here"
        onChange={handleTaskInput}
        className="input-field"
        value={task}
      />
      <button
        type="button"
        className="submit-button"
        onClick={handleTaskSubmit}
      >
        {selectedTodoId ? "Update Task" : "Add Task"}
      </button>
      <h1>All Tasks</h1>
      <TodoList
        todos={localTodos}
        handleUpdateTodo={handleUpdateTodo}
        handleDeleteTodo={handleDeleteTodo}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Home;
