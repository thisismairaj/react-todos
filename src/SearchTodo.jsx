import "./SearchTodo.css"

const SearchTodo = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        role="searchbox"
        placeholder="Search Todos"
      />
    </form>
  )
}
export default SearchTodo
