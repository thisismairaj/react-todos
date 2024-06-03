import "./AddTodo.css"
import { FaPlus } from "react-icons/fa"
import { useRef } from "react"

const AddTodo = ({ handleSubmit, newTodo, setNewTodo }) => {
  const inputRef = useRef()

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Add Todo</label>
      <input
        ref={inputRef}
        type="text"
        autoFocus
        id="addTodo"
        placeholder="Add Todo"
        required
        value={newTodo}
        onChange={(e) => {
          console.log(e.target.value)
          setNewTodo(e.target.value)
        }}
      />
      <button
        type="submit"
        aria-label="Add Todo"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  )
}
export default AddTodo
