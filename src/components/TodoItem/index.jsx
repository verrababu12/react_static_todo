import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./index.css";

const TodoItem = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
  onToggleEdit,
}) => {
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSubmit = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText);
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            className="edit-input"
          />
          <button onClick={handleEditSubmit}>Save</button>
        </>
      ) : (
        <label
          className={todo.completed ? "todo-text completed" : "todo-text"}
          onDoubleClick={() => onToggleEdit(todo.id)}
        >
          {todo.text}
        </label>
      )}
      {!todo.completed && (
        <button onClick={() => onToggleEdit(todo.id)}>
          <FaEdit />
        </button>
      )}
      <button onClick={() => onDelete(todo.id)}>
        <MdDelete />
      </button>
    </li>
  );
};

export default TodoItem;

// import "./index.css";

// const TodoItem = (props) => {
//   const { text } = props;
//   return <li>{text}</li>;
// };

// export default TodoItem;
