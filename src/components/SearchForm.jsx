import "../css/componenets/SearchForm.css";

export default function SearchForm({ searchTerm, setSearchTerm }) {
  return (
    <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
      <input
        id="music-search"
        type="search"
        placeholder="Musik suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
