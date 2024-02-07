import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    setTodos: (state, action) => {
      action.payload.forEach(todo => {
        const index = state.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          state.todos[index] = todo;
        } else {
          state.todos.push(todo);
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
