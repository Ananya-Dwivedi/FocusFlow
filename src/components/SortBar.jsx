function SortBar({ sortOption, onSort }) {
  return (
    <section>
      <select
        value={sortOption}
        onChange={(event) => onSort(event.target.value)}
      >
        <option value="none">Default Order</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </section>
  );
}

export default SortBar;