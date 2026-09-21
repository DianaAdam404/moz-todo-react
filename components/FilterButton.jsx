function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      className="filter-button"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
}

export default FilterButton;
