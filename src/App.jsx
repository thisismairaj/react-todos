import { useState, useEffect } from "react"
import AddTodo from "./AddTodo"
import SearchTodo from "./SearchTodo"
import apiRequest from "./apiRequest"
import Content from "./Content"

function App() {
  const API_URL = "http://localhost:3500/items"

  const [todos, setTodos] = useState([])

  const [newTodo, setNewTodo] = useState("")
  const [search, setSearch] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("did not receive expected data")
        const todosList = await res.json()
        setTodos(todosList)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => fetchTodos(), 1000)
  }, [])

  const handleCheck = async (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    )

    setTodos(newTodos)

    const myTodo = newTodos.filter((todo) => todo.id === id)

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myTodo[0].checked }),
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)

    const deleteOptions = {
      method: "DELETE",
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo) return
    addTodo(newTodo)
    setNewTodo("")
  }

  const addTodo = async (todo) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1
    const myNewTodo = { id, checked: false, item: todo }
    const listTodos = [...todos, myNewTodo]
    setTodos(listTodos)

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewTodo),
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }

  return (
    <>
      <div className="App">
        <header>
          <h1>My Todos</h1>
        </header>

        <AddTodo
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleSubmit={handleSubmit}
        />

        <SearchTodo searchText={search} setSearch={setSearch} />

        <main>
          {isLoading && <p>Loading...</p>}
          {fetchError && <p style={{ color: "red" }}>Error: {fetchError}</p>}
          {!fetchError && !isLoading && (
            <Content
              items={todos.filter((item) =>
                item.item.toLowerCase().includes(search.toLowerCase())
              )}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          )}
        </main>
        <footer>
          <p>
            {todos.length} List {todos.length === 1 ? "todo" : "todos"}
          </p>
        </footer>
      </div>
    </>
  )
}

export default App
