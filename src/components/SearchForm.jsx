import "../css/componenets/SearchForm.css";

export default function SearchForm({
  searchTerm,
  setSearchTerm,
  placeholder = "Suchbegriff ...",
}) {
  return (
    <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
      <input
        id="music-search"
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
