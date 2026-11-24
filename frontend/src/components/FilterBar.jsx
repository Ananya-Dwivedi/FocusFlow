function FilterBar({ filter, onFilter }) {
  return (
    <section className="filter-section">
      <select
        className="filter-select"
        value={filter}
        onChange={(event) => onFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
    </section>
  );
}

export default FilterBar;