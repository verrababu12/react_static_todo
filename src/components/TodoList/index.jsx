import { useState, useEffect } from "react";
import TodoItem from "../TodoItem";
import "./index.css";

const LOCAL_STORAGE_KEY = "my_todo_list";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setUserInput] = useState("");

  // Load todos from localStorage on first mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      console.log("No todos found in localStorage");
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const onChangeInputValue = (event) => {
    setUserInput(event.target.value);
  };

  const onAddingTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      isEditing: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setUserInput("");
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const toggleEditing = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="todo-container">
      <div className="todo-header-container">
        <input
          type="text"
          onChange={onChangeInputValue}
          value={input}
          placeholder="Enter a task"
        />
        <button type="button" onClick={onAddingTodo}>
          ADD TODO
        </button>

        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onToggleEdit={toggleEditing}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

// import { useState } from "react";
// import TodoItem from "../TodoItem";
// import "./index.css";

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [input, setUserInput] = useState("");

//   const onChangeInputValue = (event) => {
//     setUserInput(event.target.value);
//   };

//   const onAddingTodo = () => {
//     if (input.trim() === "") return;
//     const newTodo = {
//       id: Date.now(),
//       text: input,
//       completed: false,
//       isEditing: false,
//     };
//     setTodos((prevState) => [...prevState, newTodo]);
//     setUserInput("");
//   };

//   const toggleComplete = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const editTodo = (id, newText) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
//       )
//     );
//   };

//   const toggleEditing = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
//       )
//     );
//   };

//   return (
//     <div className="todo-container">
//       <input
//         type="text"
//         onChange={onChangeInputValue}
//         value={input}
//         placeholder="Enter a task"
//       />
//       <button type="button" onClick={onAddingTodo}>
//         ADD TODO
//       </button>
//       <ul className="todo-list">
//         {todos.map((todo) => (
//           <TodoItem
//             key={todo.id}
//             todo={todo}
//             onToggleComplete={toggleComplete}
//             onDelete={deleteTodo}
//             onEdit={editTodo}
//             onToggleEdit={toggleEditing}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

// import { useState } from "react";
// import TodoItem from "../TodoItem";
// import "./index.css";

// const TodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [input, setUserInput] = useState("");

//   const onChangeInputValue = (event) => {
//     setUserInput(event.target.value);
//   };

//   const onAddingTodo = () => {
//     const newTodo = {
//       text: input,
//     };
//     setTodos((prevState) => [...prevState, newTodo]);
//     setUserInput("");
//   };

//   return (
//     <>
//       <input type="text" onChange={onChangeInputValue} value={input} />
//       <button type="button" onClick={onAddingTodo}>
//         ADD TODO
//       </button>
//       <ul>
//         {todos.map((todo, index) => (
//           <TodoItem key={index} text={todo.text} />
//         ))}
//       </ul>
//     </>
//   );
// };

// export default TodoList;
