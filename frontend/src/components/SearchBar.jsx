function SearchBar({ searchTerm, onSearch }) {
  return (
    <section className="task-controls">
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
      />
    </section>
  );
}

export default SearchBar;